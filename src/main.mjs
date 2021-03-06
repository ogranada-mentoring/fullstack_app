import { config } from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import { assemblePaths } from './common/docTools.mjs';
import { Logger } from './common/logger.mjs';
import { prepareRouters } from './controllers/routers/index.mjs';
import { connect } from './model/index.mjs';

async function main() {
  config();
  const {
    PORT = 3000,
  } = process.env;
  const PREFIX = '/api/v1';
  const connected = await connect(process.env);
  if (connected) {
    const server = express();

    assemblePaths('./openapi.yml', PREFIX, server);
    prepareRouters(server);

    nunjucks.configure('src/views', {
      autoescape: true,
      express: server,
      watch: true,
    });

    server.listen(PORT, () => {
      Logger.log(`Server ready at http://localhost:${PORT}`);
    });
  }
}

main();
