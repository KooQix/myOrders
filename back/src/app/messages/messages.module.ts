import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
    imports: [OrderModule],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
