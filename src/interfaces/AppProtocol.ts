/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AppProtocol {
  app: any;
  middlewares: () => void;
  routes: () => void;
}
