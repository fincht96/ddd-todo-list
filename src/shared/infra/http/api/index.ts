import express from 'express';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Let's just chill" });
});

v1Router.use('/', v1Router);
export { v1Router };
