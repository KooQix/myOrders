import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    private readonly API_URL = env.API_URL;

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
    update(client: Client): Promise<Client> {
        const id = client.id;
        delete client.id;
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
}
