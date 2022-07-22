import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OperatorModule } from './app/operator/operator.module';
import { ClientModule } from './app/client/client.module';
import { AddressModule } from './app/address/address.module';
import { OrderModule } from './app/order/order.module';
import { CompanyModule } from './app/company/company.module';
import { MessagesModule } from './app/messages/messages.module';
import { ProductModule } from './app/product/product.module';
import { SiteModule } from './app/site/site.module';
import { AuthModule } from './app/site/auth/auth.module';

@Module({
    imports: [
        // Import environment variables and scope them globally.
        // No need to import ConfigModule in the other modules to get the environment variables
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST ?? 'localhost',
            port: parseInt(process.env.DB_PORT) ?? 3306,
            username: process.env.DB_USER ?? 'root',
            password: process.env.DB_PASS ?? '',
            database: process.env.DB_NAME,
            // entities: [],
            // true shouldn't be used in production
            autoLoadEntities: true,
            synchronize: false,
        }),
        OperatorModule,
        ClientModule,
        AddressModule,
        OrderModule,
        CompanyModule,
        MessagesModule,
        ProductModule,
        SiteModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
