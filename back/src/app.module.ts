import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OperatorModule } from './operator/operator.module';
import { ClientModule } from './client/client.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';

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
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
