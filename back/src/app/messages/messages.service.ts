import { Injectable } from '@nestjs/common';

export interface Message {
    number: number;
    message: string;
}

@Injectable()
export class MessagesService {
    constructor() {}

    send(commandID: number) {
        console.log(commandID);
    }
}
