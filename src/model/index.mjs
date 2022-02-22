// Imports

import mongoose from 'mongoose';
import { createModel as createUserModel } from './models/users.mjs';

const models = {};

export async function getProducts() {
  return [
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
    { name: 'Product 5' },
    { name: 'Product 6' },
    { name: 'Product 7' },
  ];
}

/**
 * Connect to a mongoDB database
 * @param {Object} env Object with environment variables
 * @param {string} env.DB_HOST Database host
 * @param {string} env.DB_PORT Database port
 * @param {string} env.DB_PROTOCOL Database protocol
 * @param {string} env.DB_DATABASE Database name
 * @returns {boolean} true if the connection happened successfully
 */
export async function connect(env) {
  try {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_PROTOCOL = 'mongodb',
      DB_DATABASE = 'test',
    } = env || {};
    const URI = `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    await mongoose.connect(URI);
    models.User = createUserModel();
    return true;
  } catch (error) {
    // Saque info de aca...
    throw new Error('Problem with database conection');
  }
}

/**
 * Return a model.
 * @param {string} name model name.
 */
export function getModel(name) {
  if (!models[name]) {
    throw new Error(`Invalid model name ${name}`);
  }
  return models[name];
}

export default {
  connect,
  getProducts,
};
