import { config } from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import { Logger } from './common/logger.mjs';
import { getProducts } from './models/index.mjs';

function main() {
  config();
  const {
    PORT = 3000,
  } = process.env;
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

main();
