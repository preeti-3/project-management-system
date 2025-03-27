import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './execption-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter} = app.get(HttpAdapterHost)
  const exceptionFilter = new ExceptionFilter(httpAdapter)
  app.useGlobalFilters(exceptionFilter)
  app.setGlobalPrefix('/api/v1/');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
