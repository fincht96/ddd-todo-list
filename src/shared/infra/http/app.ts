import express from 'express';
import path from 'path';
import { v1Router } from './api';

const port = process.env.PORT || 3000;
const app = express();

// client
app.use(express.static(path.join(process.cwd(), 'build')));

// api
app.use('/api/v1', v1Router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
