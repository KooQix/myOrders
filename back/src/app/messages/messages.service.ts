import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import Vonage, { SendSmsOptions } from '@vonage/server-sdk';

export interface Message {
    phone: number;
    message: string;
}

@Injectable()
export class MessagesService {
    private readonly testMode = process.env.TEST_MODE == '1';
    private readonly VONAGE_API_KEY = process.env.VONAGE_API_KEY;
    private readonly VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;

    private readonly vonage = new Vonage({
        apiKey: this.VONAGE_API_KEY,
        apiSecret: this.VONAGE_API_SECRET,
    });

    constructor(private orderService: OrderService) {}

    /**
     * Send a message for all the valid orders of the given date
     *
     * @param date The order's date
     * @returns
     */
    async sendAll(date: Date) {
        // Orders are valid if
        const orders = (await this.orderService.findAllByDate(date)).filter(
            (order) => this.isValidToSend(order)
        );

        // Since we're here, the orders valid, send them all
        let res: Message[] = [];

        for (const order of orders) {
            res.push(...(await this.sendOne(order)));
        }

        // Managing errors, and update db
        return res;
    }

    private async sendOne(order: Order): Promise<Message[]> {
        const message = this.formatMessage(order);

        let res: Message[] = [];

        // Sent to every operator
        for (const operator of order.operators) {
            res.push({
                phone: parseInt(operator.phone),
                message: message,
            });
        }

        let _order = order;
        _order.sent = true;
        await this.orderService.update(order.id, _order);

        return res;
    }

    /**
     * Send a SMS using Vonage API
     *
     * @param from Sender
     * @param to Receiver
     * @param text text messages to send
     */
    private sendSMSVonage(
        order: Order,
        from: string,
        to: string,
        text: string
    ) {
        const opts: Partial<SendSmsOptions> = {
            from: from,
            to: to,
        };
        this.vonage.message.sendSms(
            from,
            to,
            text,
            opts,
            (err: any, responseData: any) => {
                if (err) {
                    console.log('err');
                    return false;
                } else {
                    if (responseData.messages[0]['status'] === '0') {
                        console.log('sent!');
                        return true;
                    } else {
                        console.log(
                            `Message failed with error: ${responseData.messages[0]['error-text']}`
                        );
                        return false;
                    }
                }
            }
        );
    }

    private isValidToSend(order: Order): boolean {
        // Valid if operators are filled and message is not already sent (by default, order.sent is null. When trying to send the message, update the value: true if successfully sent, false otherwise)
        return !!order.operators && order.operators.length > 0 && !!!order.sent;
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
        res += `Produit: ${order.product.name}\n`;
        res += `Tonnage: ${order.tonnage}`;

        if (order.deblais != 0) res += `\nAvec deblais`;

        if (!!order.info)
            res += `\n\nInformations complémentaires: \n${order.info}`;

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
