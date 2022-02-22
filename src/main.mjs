import { config } from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import { Logger } from './common/logger.mjs';
import { connect, getProducts } from './model/index.mjs';

async function main() {
  config();
  const {
    PORT = 3000,
  } = process.env;
  const connected = await connect(process.env);
  if (connected) {
    const server = express();

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
