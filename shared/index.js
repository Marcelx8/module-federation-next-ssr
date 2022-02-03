const React = require("react");
const createMatcher = require("feather-route-matcher").default;
const { Parser, ProcessNodeDefinitions } = require("html-to-react");
const stringifyDeterministic = require("json-stringify-deterministic");
const sortRecursive = require("sort-keys-recursive");
const ErrorBoundary = require("./ErrorBoundary");
// const { captureException } = require("./sentry");

function createId(remote, module, props) {
  return stringifyDeterministic(sortRecursive({ module, props, remote }));
}

function createFetchFederatedComponentCtx({ remotes }, previous) {
  const processNodeDefinitions = new ProcessNodeDefinitions(React);
  const parser = new Parser();

  const context = {
    components: {},
    chunks: [],
    promises: new Map(),
    ...previous,
    loadFederatedComponent(id, remote, module, props) {
      if (context.promises.has(id)) {
        return;
      }

      const prerenderUrl = remotes[remote] && remotes[remote].prerender;

      if (!prerenderUrl) {
        context.components[id] = () => null;
        console.error(
          "Remote",
          remote,
          "is not configured for fetch rendering."
        );
        return;
      }

      let componentPromise = fetch(prerenderUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module,
          props,
        }),
      })
        .then((res) => res.json())
        .then(({ chunks, html }) => {
          const fullChunks = chunks.map((c) => remotes[remote].publicPath + c);
          context.chunks.push(...fullChunks);
          context.components[id] = ({ children }) => {
            const reactElement = parser.parseWithInstructions(
              html,
              () => true,
              [
                {
                  shouldProcessNode: (node) => {
                    // If the pre-rendered component rendered a children placeholder,
                    // we will process this ourselves.
                    if (
                      node &&
                      node.type === "text" &&
                      node.data === "\u200Cchildren\u200C"
                    ) {
                      return true;
                    }
                    return false;
                  },
                  processNode: (_, __, index) => {
                    return React.createElement(
                      React.Fragment,
                      { key: index },
                      children
                    );
                  },
                },
                {
                  // Process all other nodes with the lib defaults.
                  shouldProcessNode: () => true,
                  processNode: processNodeDefinitions.processDefaultNode,
                },
              ]
            );

            return React.createElement(
              "div",
              {
                style: { display: "contents" },
              },
              reactElement
            );
          };
        })
        .catch((error) => {
          // captureException(error);
          // if SSR fails, render null on SSR
          context.components[id] = () => null;
        });

      context.promises.set(id, componentPromise);
    },
  };

  return context;
}

function createWindowFederatedComponentCtx(options, previous) {
  const context = {
    components: {},
    chunks: [],
    ...previous,
    promises:
      previous && previous.promises && previous.promises.has
        ? previous.promises
        : new Map(),
    async loadFederatedComponent(id, remote, module, props, shareScope) {
      if (context.promises.has(id)) {
        return;
      }

      const componentPromise = Promise.resolve(
        __webpack_init_sharing__(shareScope)
      )
        .catch(() => null)
        .then(() => {
          if (!window[remote]) {
            throw new Error(`Remote ${remote} is not avaliable on window.`);
          }
          return Promise.resolve(
            window[remote].init(__webpack_share_scopes__[shareScope])
          ).catch(() => null);
        })
        .then(() => {
          try {
            // attempt to get sentry remote module
            return window[remote].get("./sentry").then((factory) => factory());
          } catch (e) {}
          return null;
        })
        .then(() => window[remote].get(module))
        .then((factory) => factory())
        .then((mod) => {
          context.components[id] = mod.default || mod;
        })
        .catch((err) => {
          console.error(err);
          context.components[id] = () => null;
        });

      context.promises.set(id, componentPromise);

      return componentPromise;
    },
  };

  return context;
}

function getOrCreateFederatedComponentCtx(options, previous) {
  return typeof window === "undefined"
    ? createFetchFederatedComponentCtx(options, previous)
    : createWindowFederatedComponentCtx(options, previous);
}

const federatedComponentsContext = React.createContext();

function fetchFederatedComponent(remote, module) {
  return ({ children, ...props }) => {
    const context = React.useContext(federatedComponentsContext);
    const id = createId(remote, module, props);
    const Component = context.components[id];

    if (!Component) {
      //happens on prepass
      context.loadFederatedComponent(id, remote, module, props);
      return React.createElement(React.Fragment, {}, children);
    }

    return React.createElement(Component, props, children);
  };
}

function windowFederatedComponent(remote, module, shareScope) {
  return (props) => {
    const context = React.useContext(federatedComponentsContext);
    const id = createId({ module, remote });

    const Component = context.components[id];

    const [mounted, setMounted] = React.useState();
    React.useEffect(() => {
      context
        .loadFederatedComponent(id, remote, module, props, shareScope)
        .then(() => setMounted(true));
    }, []);

    if (!mounted || !Component) {
      return React.createElement("div", {
        style: { display: "contents" },
        dangerouslySetInnerHTML: { __html: "" },
        suppressHydrationWarning: true,
      });
    }
    return React.createElement(
      ErrorBoundary,
      { remote, module },
      React.createElement(Component, props)
    );
  };
}

function federatedComponent(remote, module, shareScope = "default") {
  const FederatedComponent =
    typeof window === "undefined"
      ? fetchFederatedComponent(remote, module)
      : windowFederatedComponent(remote, module, shareScope);
  return FederatedComponent;
}

//catch all handling

async function matchFederatedPage(remotes, path) {
  if (!remotes) {
    console.error(
      "No __REMOTES__ webpack global defined or no remotes passed to catchAll"
    );
  }
  const maps = await Promise.all(
    Object.entries(remotes).map(([remote, loadRemote]) => {
      console.log("page map", remote, loadRemote);
      const loadOrReferenceRemote = !window[remote]
        ? loadRemote()
        : window[remote];
      return Promise.resolve(loadOrReferenceRemote).then((container) => {
        return container
          .get("./pages-map")
          .then((factory) => ({ remote, config: factory().default }))
          .catch(() => null);
      });
    })
  );
  const config = {};

  for (let map of maps) {
    if (!map) continue;

    for (let [path, mod] of Object.entries(map.config)) {
      config[path] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  const matcher = createMatcher(config);
  const match = matcher(path);

  return match;
}

function createFederatedCatchAll(remotes, ErrorComponent, NotFoundComponent) {
  const FederatedCatchAll = (initialProps) => {
    const [lazyProps, setProps] = React.useState({});

    const { FederatedPage, render404, renderError, needsReload, ...props } = {
      ...lazyProps,
      ...initialProps,
    };

    React.useEffect(async () => {
      if (needsReload) {
        const federatedProps = await FederatedCatchAll.getInitialProps(props);
        setProps(federatedProps);
      }
    }, []);

    const params =
      typeof window === "undefined"
        ? null
        : new URLSearchParams(location.search);
    const is404 = !!params && params.has("404");
    React.useEffect(() => {
      if (!is404 && render404) {
        params.set("404", "1");
        location.replace(location.pathname + "?" + params.toString());
      }
    }, [render404, is404]);

    if (render404) {
      if (is404) {
        return NotFoundComponent
          ? React.createElement(NotFoundComponent, props)
          : React.createElement("h1", {}, "404 Not Found");
      } else {
        return null;
      }
    }

    if (renderError) {
      return ErrorComponent
        ? React.createElement(ErrorComponent, props)
        : React.createElement("h1", {}, "Oops, something went wrong.");
    }

    if (FederatedPage) {
      return React.createElement(FederatedPage, props);
    }

    return null;
  };

  FederatedCatchAll.getInitialProps = async (ctx) => {
    const { err, req, res, AppTree, ...props } = ctx;

    if (err) {
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }

    if (!process.browser) {
      return { needsReload: true, ...props };
    }

    try {
      const matchedPage = await matchFederatedPage(remotes, ctx.asPath);

      const remote =
        matchedPage && matchedPage.value && matchedPage.value.remote;
      const mod = matchedPage && matchedPage.value && matchedPage.value.module;

      if (!remote || !mod) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      console.log("loading exposed module", mod, "from remote", remote);
      try {
        if (!window[remote].__initialized) {
          window[remote].__initialized = true;
          await window[remote].init(__webpack_share_scopes__.default);
        }
      } catch (initErr) {
        console.log("initErr", initErr);
      }
      console.log("finding remote", remote);
      const FederatedPage = await window[remote]
        .get(mod)
        .then((factory) => factory().default);
      console.log("FederatedPage", FederatedPage);
      if (!FederatedPage) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      const modifiedContext = {
        ...ctx,
        query: matchedPage.params,
      };
      const federatedPageProps =
        (await (FederatedPage.getInitialProps &&
          FederatedPage.getInitialProps(modifiedContext))) || {};
      return { ...federatedPageProps, FederatedPage };
    } catch (err) {
      console.log("err", err);
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
  };

  return FederatedCatchAll;
}

module.exports = {
  getOrCreateFederatedComponentCtx,
  federatedComponentsContext,
  federatedComponent,
  matchFederatedPage,
  createFederatedCatchAll,
};
