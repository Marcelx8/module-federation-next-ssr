# module-federation-next-ssr

This is a usage example of Webpack's Module Federation for Next.js SSR, using the <a href="https://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-ssr">@module-federation/nextjs-ssr</a> pluing created by <a href="https://github.com/ScriptedAlchemy">@ScriptedAlchemy</a>.
The plugin is not free, and at the time of writing this, it is in beta (version 0.0.1-beta.12)

*This example is based on <a href="https://github.com/module-federation/module-federation-examples/tree/master/nextjs-ssr">module-federation/module-federation-examples/nextjs-ssr</a>*

## This workspace contains 4 Next.js apps, `home`, `pdp`, `server`, `ui`.

## Usage

1. Clone the repo and run `yarn` in the root to install the workspace dependencies.
2. If you have access to the plugin mentioned above, then `cd` into each of the NextJS apps and use `npm` to intsall the plugin with your given registry details.
3. Run `npm i` to install the rest of the dependencies.
4. There is another "shared" repo called `route-matcher` which can be externalized to an npm package. For local development, `cd` to the folder and run `yarn link`. Then, in the 4 app routes, run `yarn link route-matcher`.
5. When all is installed and done, `cd ..` to the workspace directory and run `yarn dev`.
6. To test the build, run `yarn start && yarn build` in the following sequence:
  1. ui,
  2. shell,
  3. home,
  4. products

### Enjoy!
