import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

// import { CsLoggerService } from './cs-logger/cs-logger.service';

// entry point of the application
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const corsOptions = {
  origin: (origin: string, callback: any) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};


async function bootstrap() {
  // custom buffer logs so that the logger service can initiate
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true
  // });

  // // custom logger service 
  // app.useLogger(app.get(CsLoggerService));

  const app = await NestFactory.create(AppModule); 

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  // enable cors
  app.enableCors(corsOptions);  
  // set global prefix for all routes which is 'api' in this case
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
