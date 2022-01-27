import { createFederatedCatchAll } from "route-matcher";

export default createFederatedCatchAll(process.env.REMOTES);
