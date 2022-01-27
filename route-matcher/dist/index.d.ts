export function matchFederatedPage(remotes: any, path: any): Promise<any>;
export function createFederatedCatchAll(remotes: any): {
    (initialProps: any): React.DetailedReactHTMLElement<{}, HTMLElement> | React.CElement<any, React.Component<any, any, any>>;
    getInitialProps(ctx: any): Promise<any>;
};
import React from "react";
