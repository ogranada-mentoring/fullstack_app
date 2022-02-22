export function getRouter() {
  return {
    '/status': (req, res) => {
      res.send('OK');
    },
  };
}

export default {
  getRouter,
};
