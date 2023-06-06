import express from 'express';
import path from 'path';
import { v1Router } from './api/v1';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// client
app.use(express.static(path.join(process.cwd(), 'build')));

// api
app.use('/v1', v1Router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
