import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const documentBuilder = new DocumentBuilder()
    .setTitle('Exam Application')
    .setDescription('The Exam app API description')
    .addTag('Exam REST API')


    if(process.env.API_VERSION){
        documentBuilder.setVersion(process.env.API_VERSION);
    }

    documentBuilder.setExternalDoc('Postman Collection', '/api-json')

    documentBuilder.addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        in: 'header',
        name: 'Authorization',
    })

    const document = SwaggerModule.createDocument(app, documentBuilder.build());
    SwaggerModule.setup('api', app, document, {swaggerOptions:{
        persistAuthorization: true,
    }});

    const logger = new Logger('Swagger');
    logger.debug(`Swagger UI available at http://localhost:${process.env.SERVICE_PORT??3000}/api`);
}