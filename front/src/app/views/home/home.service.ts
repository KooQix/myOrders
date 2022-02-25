import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private readonly API_URL = env.API_URL;

    constructor(private http: HttpClient) {}

    initOrder(orderID: number): Promise<Order> | Order {
        if (orderID !== -1) {
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
            produit: '',
            price: 0,
            operator: {
                id: -1,
                name: '',
                surname: '',
                phone: '',
            },
        };
    }

    /**
     * Get all orders
     *
     * @returns
     */
    getAll(): Promise<Order[]> {
        return this.http.get<Order[]>(`${this.API_URL}order`).toPromise();
    }

    /**
     * Update a order
     *
     * @param order
     */
    update(order: Order): Promise<Order> {
        const id = order.id;
        delete order.id;
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
        return this.http.post<Order>(`${this.API_URL}order`, order).toPromise();
    }
}
