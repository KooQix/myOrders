import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { Message, MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {}

    @Get(':id')
    send(@Param('id') commandID: number) {
        try {
            return this.service.send(commandID);
        } catch (error) {
            throw new HttpException(
                "Une erreur est survenue lors de l'envoi du message",
                HttpStatus.EXPECTATION_FAILED
            );
        }
    }
}
