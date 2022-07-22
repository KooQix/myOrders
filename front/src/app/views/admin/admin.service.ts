import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Site } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private readonly API_URL = env.API_URL;

    constructor(private http: HttpClient) {}

    /**
     * Send protected API requests that throw an error if not valid token or no token at all
     *
     * @returns
     */
    checkToken() {
        return this.http.get(`${this.API_URL}site/checkToken`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') ?? '',
            },
        });
    }

    getAllSites() {
        return this.http.get<Site[]>(`${this.API_URL}site`).toPromise();
    }

    initSite(siteID: number) {
        if (siteID !== -1) {
            return this.http
                .get<Site>(`${this.API_URL}site/${siteID}`)
                .toPromise();
        }

        return {
            id: -1,
            name: '',
            created_at: '',
            updated_at: '',
        };
    }

    create(site: Site) {
        delete site.id;
        return this.http.post<Site>(`${this.API_URL}site/`, site).toPromise();
    }

    update(site: Site) {
        const id = site.id;
        delete site.id;
        return this.http
            .patch<Site>(`${this.API_URL}site/${id}`, site)
            .toPromise();
    }

    /**
     * Delete a site
     *
     * @param site Site to delete
     */
    async delete(site: Site) {
        this.http.delete(`${this.API_URL}site/${site.id}`).toPromise();
    }
}
