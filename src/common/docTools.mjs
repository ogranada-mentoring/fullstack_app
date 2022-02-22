import SwaggerParser from '@apidevtools/swagger-parser';
import swaggerUi from 'swagger-ui-express';
import { Logger } from './logger.mjs';

/**
 * Return data structure according the documentation
 * @param filename name of doc file
 */
export function getDocsData(filename) {
  return new Promise((resolve, reject) => {
    SwaggerParser.validate(filename, (err, api) => {
      if (err) {
        reject(err);
      } else {
        resolve(api);
      }
    });
  });
}

export async function assemblePaths(filename, prefix, routers, server) {
  const data = await getDocsData(filename);
  Logger.log(`Docs at ${prefix}/docs`);
  server.use(`${prefix}/docs`, swaggerUi.serve, swaggerUi.setup(data));
  const paths = Object.keys(data.paths);
  paths.forEach((path) => {
    const pathInfo = data.paths[path];
    const methods = Object.keys(pathInfo);
    methods.forEach((method) => {
      const methodInfo = pathInfo[method];
      const router = methodInfo.operationId;
      if (routers[router][path]) {
        const finalPath = `${prefix}${path}`;
        server[method](finalPath, routers[router][path]);
      } else {
        const finalPath = `${prefix}${path}`;
        server[method](finalPath, (req, res) => {
          res.status(404).send('Invalid path, not implemented');
        });
      }
    });
  });
}

export default {
  getDocsData,
};
