import { Injectable } from '@angular/core';
import { Order } from 'src/app/resources/interfaces';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor() {}

    initOrder(orderID: number): Order {
        // if (orderID !== -1) {}

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
}
