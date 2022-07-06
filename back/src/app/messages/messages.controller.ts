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

interface body {
    date?: Date;
    site_id: string;
}

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {}

    @Post()
    async send(@Body() body: body) {
        try {
            return await this.service.sendAll(body.site_id, body.date);
        } catch (error) {
            throw new HttpException(
                "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard",
                HttpStatus.EXPECTATION_FAILED
            );
        }
    }
}
