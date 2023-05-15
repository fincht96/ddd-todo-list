import express from 'express';

const app = express();
const port = process.env.API_PORT;

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log('port', port);
  console.log("I'm listening or am I");
});
