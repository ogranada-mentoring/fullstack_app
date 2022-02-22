import { Router } from 'express';
import { getProducts } from '../../model/index.mjs';

export function getRouter() {
  const router = new Router();

  router.get('/', async (req, res) => {
    const products = await getProducts();
    res.render('index.html', {
      products,
    });
  });

  router.get('/status', (req, res) => {
    res.send('OK');
  });

  return router;
}

export default {
  getRouter,
};
