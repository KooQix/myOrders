/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Address, Client } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    private readonly API_URL = env.API_URL;
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );

    constructor(private http: HttpClient) {}

    /**
     * Init a client when trying to create / update one
     * If id == -1 => create a client, else update it
     *
     * @param clientID
     * @returns
     */
    initClient(clientID: number): Promise<Client> | Client {
        if (clientID !== -1) {
            return this.http
                .get<Client>(`${this.API_URL}client/${clientID}`)
                .toPromise();
        }
        return {
            id: -1,
            name: '',
            surname: '',
            phone: '',
            addresses: [],
        };
    }

    /**
     * Get all clients
     *
     * @returns
     */
    getAll(): Promise<Client[]> {
        return this.http.get<Client[]>(`${this.API_URL}client`).toPromise();
    }

    /**
     * Update a client
     *
     * @param client
     */
    async update(client: Client): Promise<Client> {
        const id = client.id;
        delete client.id;

        // Check if an address has been added to the client (in that case, create the address, get its id and then update the client)
        for (let i = 0; i < client.addresses.length; i++) {
            let address = client.addresses[i];
            if (!!!address.id) {
                address = {
                    ...address,
                    client: id,
                };
                const newAddress = await this.addAddress(address);
                client.addresses[i] = {
                    id: newAddress.id,
                    ...address,
                };
            }
        }
        return this.http
            .patch<Client>(`${this.API_URL}client/${id}`, client)
            .toPromise();
    }

    /**
     * Create a new client
     *
     * @param client
     * @returns
     */
    create(client: Client): Promise<Client> {
        delete client.id;
        return this.http
            .post<Client>(`${this.API_URL}client`, client)
            .toPromise();
    }

    /**
     * Delete a client
     *
     * @param client
     * @returns
     */
    async deleteClient(client: Client): Promise<Client> {
        // Delete each address
        for (const address of client.addresses) {
            if (!address.id) continue;
            await this.deleteAdd(address.id);
        }
        return this.http
            .delete<Client>(`${this.API_URL}client/${client.id}`)
            .toPromise();
    }

    /**
     * Add a new address to the client
     * @param address
     * @returns
     */
    addAddress(address: Address): Promise<Address> {
        return this.http
            .post<Address>(`${this.API_URL}address`, address)
            .toPromise();
    }

    /**
     * Delete an address from the client
     * @param id
     * @returns
     */
    deleteAdd(id?: number) {
        return this.http.delete(`${this.API_URL}address/${id}`).toPromise();
    }
}
