import { getRouter as getGeneralRouter } from './general.mjs';

export function prepareRouters(server, prefix='/') {
  server.use(prefix, getGeneralRouter());
}

export default {
  prepareRouters,
};
