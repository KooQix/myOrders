import { Client } from './entities/client.entity';
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/app/address/address.module';

@Module({
    imports: [TypeOrmModule.forFeature([Client]), AddressModule],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}
