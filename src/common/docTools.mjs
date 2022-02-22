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

export async function assemblePaths(filename, prefix, server) {
  const data = await getDocsData(filename);
  Logger.log(`Docs at ${prefix}/docs`);
  server.use(`${prefix}/docs`, swaggerUi.serve, swaggerUi.setup(data));
}

export default {
  getDocsData,
};
