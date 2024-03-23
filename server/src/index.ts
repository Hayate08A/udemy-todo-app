import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 8080;

app.get('/allToDos', (req: Request, res: Response) => {
  return res.send('ToDos');
});

app.listen(PORT, () => {
  console.log('server is running 🚀');
  console.log(`localhost:${PORT}`);
});
