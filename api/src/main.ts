import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { envConfig } from './config';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const PORT = envConfig.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Server running on port ${PORT}`))
  .catch((err) => console.log(err));
