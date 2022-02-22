import mongoose from 'mongoose';

export async function createModel() {
  const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    address: String,
  });
  return mongoose.model('User', usersSchema);
}

export default {
  createModel,
};
