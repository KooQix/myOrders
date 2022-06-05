/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { Message } from './../../resources/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private readonly API_URL = env.API_URL;

    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );

    constructor(private http: HttpClient) {}

    /**
     * Initialize order (empty if orderID == -1, with order info otherwise)
     *
     * @param orderID
     * @returns
     */
    initOrder(orderID: number): Promise<Order> | Order {
        if (orderID != -1) {
            return this.http
                .get<Order>(`${this.API_URL}order/${orderID}`)
                .toPromise();
        }

        return {
            id: orderID,
            date_chargement: '',
            date_dechargement: '',
            client: {
                id: -1,
                name: '',
                surname: '',
                phone: '',
                addresses: [],
            },
            address: {
                id: -1,
                city: '',
                street: '',
                zip: 0,
            },
            product: {
                id: -1,
                name: '',
                price: 0,
            },
            price: 0,
            tonnage: 0,
            deblais: 0,
            operators: [
                {
                    id: -1,
                    name: '',
                    surname: '',
                    phone: '',
                },
            ],
        };
    }

    /**
     * Get all orders
     *
     * @returns
     */
    async getAll(date?: string): Promise<Order[]> {
        const orders = await this.http
            .post<Order[]>(`${this.API_URL}order/findAll`, { date: date })
            .toPromise();

        let res: Order[] = [];
        for (const order of orders) {
            const { date_chargement, date_dechargement, ...element } = order;
            res.push({
                date_chargement: this.shortDate(new Date(date_chargement)),
                date_dechargement: this.shortDate(new Date(date_dechargement)),
                ...element,
                color:
                    !!order.operators && order.operators?.length !== 0
                        ? ''
                        : 'rgb(128, 128, 128, 0.3)',
            });
        }
        return res;
    }

    /**
     * Get all orders for a given date
     *
     * @param date
     * @returns
     */
    async getAllByDate(date: string): Promise<Order[]> {
        const orders = await this.http
            .post<Order[]>(`${this.API_URL}order/date`, { date: date })
            .toPromise();

        let res: Order[] = [];
        for (const order of orders) {
            const { date_chargement, date_dechargement, ...element } = order;
            res.push({
                date_chargement: this.shortDate(new Date(date_chargement)),
                date_dechargement: this.shortDate(new Date(date_dechargement)),
                ...element,
                color:
                    order.operators?.length !== 0
                        ? ''
                        : 'rgb(128, 128, 128, 0.3)',
            });
        }
        return res;
    }

    /**
     * Update a order
     *
     * @param order
     */
    update(order: Order): Promise<Order> {
        const id = order.id;
        delete order.sent;
        return this.http
            .patch<Order>(`${this.API_URL}order/${id}`, order)
            .toPromise();
    }

    /**
     * Create a new order
     *
     * @param order
     * @returns
     */
    create(order: Order): Promise<Order> {
        delete order.id;
        delete order.sent;
        return this.http.post<Order>(`${this.API_URL}order`, order).toPromise();
    }

    /**
     * Delete an order
     *
     * @param order
     * @returns
     */
    delete(order: Order): Promise<Order> {
        return this.http
            .delete<Order>(`${this.API_URL}order/${order.id}`)
            .toPromise();
    }

    //////////////////// Messages \\\\\\\\\\\\\\\\\\\\

    sendMessages(date: string): Promise<Message[]> {
        return this.http
            .post<Message[]>(`${this.API_URL}messages`, {
                date: date,
            })
            .toPromise();
    }

    //////////////////// Date management \\\\\\\\\\\\\\\\\\\\

    /**
     * Format date
     *
     * @param date
     * @returns
     */
    dateFormat(date: Date) {
        const _date =
            date.toDateString().split(' ')[2] ==
            date.toISOString().split('-')[2].split('T')[0]
                ? date
                : this.getTomorrow(new Date(date)).value;

        return _date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    /**
     * Remove time from datetime
     *
     * @param date
     * @returns
     */
    shortDate(date: Date) {
        return this.dateFormat(date).split(' ')[0];
    }

    /**
     * Return the next day of date
     *
     * @param date
     * @returns
     */
    getTomorrow(date: Date) {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return new FormControl(tomorrow);
    }

    /**
     * Return next day as shortDate
     *
     * @param date
     * @returns
     */
    getTomorrowShort(date: Date) {
        return this.shortDate(this.getTomorrow(date).value);
    }
}
