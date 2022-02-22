import { config } from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import { assemblePaths } from './common/docTools.mjs';
import { Logger } from './common/logger.mjs';
import { getRouter as getGeneralRouter } from './controllers/routers/general.mjs';
import { connect, getProducts } from './model/index.mjs';

async function main() {
  config();
  const {
    PORT = 3000,
  } = process.env;
  const connected = await connect(process.env);
  if (connected) {
    const server = express();

    const routers = {
      general: getGeneralRouter(),
    };
    assemblePaths('./openapi.yml', '/api/v1', routers, server);
    nunjucks.configure('src/views', {
      autoescape: true,
      express: server,
      watch: true,
    });

    server.get('/', async (req, res) => {
      const products = await getProducts();
      res.render('index.html', {
        products,
      });
    });

    server.listen(PORT, () => {
      Logger.log(`Server ready at http://localhost:${PORT}`);
    });
  }
}

main();
