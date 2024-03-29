import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    const config = new DocumentBuilder()
        .setTitle('API Test')
        .setDescription('API para realizar operaciones CRUD en /test')
        .setVersion('1.0')
        .addTag('test')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
