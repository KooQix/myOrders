import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';

export interface Message {
    phone: number;
    message: string;
}

@Injectable()
export class MessagesService {
    constructor(private orderService: OrderService) {}

    /**
     * Send a message for all the valid orders of the given date
     *
     * @param date The order's date
     * @returns
     */
    async sendAll(date: Date) {
        // Orders are valid if
        const orders = (await this.orderService.findAll(date)).filter((order) =>
            this.isValidToSend(order)
        );

        // Since we're here, the orders valid, send them all
        let res: Message[];

        for (const order of orders) {
            res.push(await this.sendOne(order));
        }

        return res;
    }

    private async sendOne(order: Order): Promise<Message> {
        const message = this.formatMessage(order);

        return {
            phone: order.operators[0].phone,
            message: message,
        };
    }

    private isValidToSend(order: Order): boolean {
        // Valid if operators are filled and message is not already sent (by default, order.sent is null. When trying to send the message, update the value: true if successfully sent, false otherwise)
        return (
            !!order.operators &&
            order.operators.length > 0 &&
            order.sent !== false
        );
    }

    //////////////////// Formatting \\\\\\\\\\\\\\\\\\\\

    private formatMessage(order: Order): string {
        let res = '';

        res += `Date chargement: ${this.dateFormat(order.date_chargement)}\n`;
        res += `Date dechargement: ${this.dateFormat(
            order.date_dechargement
        )}\n\n`;
        res += `Client: ${order.client}\n`;
        res += `Adresse: \n${order.address}\n\n`;
        res += `Produit: ${order.produit}`;

        if (!!order.info)
            res += `\n\nInformations complémentaires: \n${order.info}`;

        console.log(res);
        return res;
    }

    /**
     * Format date
     *
     * @param date
     * @returns
     */
    private dateFormat(date: Date) {
        const _date = date.toISOString().split('T')[0];
        const date_splt = _date.split('-');
        return `${date_splt[2]}-${date_splt[1]}-${date_splt[0]}`;
    }
}
