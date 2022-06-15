import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {}

    @Post()
    async send(@Body() date: any) {
        try {
            return await this.service.sendAll(date.date);
        } catch (error) {
            throw new HttpException(
                "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard",
                HttpStatus.EXPECTATION_FAILED
            );
        }
    }
}
