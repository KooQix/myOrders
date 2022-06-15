import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import Vonage, { SendSmsOptions } from '@vonage/server-sdk';

export interface Message {
    phone: string;
    message: string;
}

@Injectable()
export class MessagesService {
    private readonly TEST_MODE = process.env.TEST_MODE == '1';
    private readonly TEST_PHONE = process.env.TEST_PHONE_NUMBER;
    private readonly TEST_SEND = process.env.TEST_SEND == '1'; // Send SMS in test mode ?

    private readonly VONAGE_API_KEY = process.env.VONAGE_API_KEY;
    private readonly VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;

    private readonly COUNTRY_CODE = process.env.COUNTRY_CODE;
    private readonly AREA_CODE = process.env.AREA_CODE;

    private readonly CONTACT_NAME = process.env.CONTACT_NAME;

    private vonage: any;

    constructor(private orderService: OrderService) {
        this.vonage = new Vonage({
            apiKey: this.VONAGE_API_KEY,
            apiSecret: this.VONAGE_API_SECRET,
        });
    }

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

    /**
     * For a given order, send the SMS to the operators
     *
     * @param order
     * @returns the list of messages sent
     */
    private async sendOne(order: Order): Promise<Message[]> {
        const message = this.formatMessage(order);

        let res: Message[] = [];

        // Send to every operator
        for (const operator of order.operators) {
            const _to = this.TEST_MODE
                ? this.TEST_PHONE.slice(1)
                : operator.phone.slice(1);

            const to = `${this.COUNTRY_CODE}${this.AREA_CODE}${_to}`;

            res.push({
                phone: to,
                message: message,
            });

            // Test mode not send
            if (this.TEST_MODE && !this.TEST_SEND) continue;

            //////////////////// VONAGE SMS \\\\\\\\\\\\\\\\\\\\

            const opts: Partial<SendSmsOptions> = {
                from: this.CONTACT_NAME,
                to: to,
            };
            this.vonage.message.sendSms(
                this.CONTACT_NAME,
                to,
                message,
                opts,
                (err: any, responseData: any) => {
                    if (err) {
                        order.sent = false;
                        this.orderService.update(order.id, order);
                    } else {
                        if (responseData.messages[0]['status'] === '0') {
                            order.sent = true;
                            this.orderService.update(order.id, order);
                        } else {
                            order.sent = false;
                            this.orderService.update(order.id, order);
                        }
                    }
                }
            );
        }

        return res;
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
