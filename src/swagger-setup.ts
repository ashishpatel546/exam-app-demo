import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function swaggerSetup(app: INestApplication){
     const config = new DocumentBuilder()
    .setTitle('Exam REST API')
    .setDescription('The EXAM API description')
    .setVersion('1.0')
    .addTag('Exam')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}