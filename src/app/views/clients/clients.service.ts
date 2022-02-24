import { Injectable } from '@angular/core';
import { Client } from 'src/app/resources/interfaces';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    constructor() {}

    initClient(clientID: number): Client {
        // if (orderID !== -1) {}
        return {
            id: -1,
            name: '',
            surname: '',
            phone: '',
            addresses: [],
        };
    }
}
