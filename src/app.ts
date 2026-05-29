import 'reflect-metadata';
import express from 'express';
import { Container } from '@core/di/container.di';
import { UserController } from '@controllers/user.controller';

const container = new Container();
container.register(UserController);
container.get(UserController);

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  console.log('request received: ', req);
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
