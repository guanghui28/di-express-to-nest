import 'reflect-metadata';
import { UserController } from '@controllers/user.controller';
import { AppManager } from '@core/app.manager';

const appManger = new AppManager({
  controllers: [UserController],
});

const app = appManger.init();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
