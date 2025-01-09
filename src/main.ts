import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Restaurant Project")
    .setDescription("Restaurant API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);



  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
