// import React from 'react';
import { createFederatedCatchAll } from "next-shared-logic";
// const ErrorComponent = () => (<h1>ErrorComponent</h1>);
// const NotFoundComponent = () => (<h1>404 NotFoundComponent</h1>);
// const remotes = ['home', 'server', 'ui', 'products']
export default createFederatedCatchAll(process.env.REMOTES);
// export default createFederatedCatchAll(['home', 'server', 'ui', 'products'], ErrorComponent, NotFoundComponent);
