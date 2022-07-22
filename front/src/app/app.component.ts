/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '../environments/environment';
import { Site } from './resources/interfaces';
import { AdminService } from './views/admin/admin.service';

interface NavLinks {
    label: string;
    link: string;
    index: number;
}

interface ConnectionReq {
    id: number;
    password: string;
}

interface ConnectionResp {
    id: number;
    name: string;
    token?: string;
    created_at: string;
    updated_at: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'myOrders';

    private readonly API_URL = env.API_URL;

    private activeLinkIndex = 0;

    sites: Site[];

    selectedSite: Site;

    pass = '';

    navLinks: NavLinks[] = [
        {
            label: 'Mes Commandes',
            link: './home',
            index: 0,
        },
        {
            label: 'Mes Clients',
            link: './clients',
            index: 2,
        },
        {
            label: 'Mes Entreprises',
            link: './companies',
            index: 3,
        },
        {
            label: 'Mes Chauffeurs',
            link: './operators',
            index: 1,
        },
        {
            label: 'Mes Produits',
            link: './products',
            index: 4,
        },
    ];

    /**
     * Manage navigation though toolbar
     *
     * @param router
     */
    constructor(
        private router: Router,
        private http: HttpClient,
        private adminService: AdminService
    ) {
        this.initSite();
        const id = localStorage.getItem('siteID');

        // No id => connection page
        if (!!!id) {
            this.initConnection();
            return;
        }

        //////////////////// ID  \\\\\\\\\\\\\\\\\\\\

        try {
            this.http
                .get<Site>(`${this.API_URL}site/${id}`)
                .subscribe((_data) => {
                    this.selectedSite = _data;

                    // Is admin?
                    if (!this.isAdmin()) {
                        this.router.events.subscribe((res) => {
                            this.activeLinkIndex =
                                this.navLinks.find(
                                    (tab) => tab.link === '.' + this.router.url
                                )?.index ?? 0;
                        });
                    } else {
                        // Admin
                        if (!!localStorage.getItem('token'))
                            this.router.navigate(['/admin']);
                        else {
                            localStorage.removeItem('siteID');
                            this.initConnection();
                        }
                    }
                });
        } catch (error) {
            this.initConnection();
            try {
                localStorage.removeItem('token');
            } catch (_error) {
                console.log(_error);
            }
            try {
                localStorage.removeItem('siteID');
            } catch (_error) {
                console.log(_error);
            }
        }
    }

    private initSite() {
        this.selectedSite = {
            id: -1,
            name: '',
            created_at: '',
            updated_at: '',
        };
    }
    private initConnection(): void {
        this.initSite();
        // Get all sites
        this.http.get(`${this.API_URL}site`).subscribe((data) => {
            this.sites = <Site[]>data;
        });
        this.pass = '';
    }

    isSiteSelected(): boolean {
        return (
            !!this.selectedSite &&
            this.selectedSite?.id !== -1 &&
            this.selectedSite.name !== ''
        );
    }

    isAdmin(): boolean {
        return (
            !!this.selectedSite &&
            this.selectedSite?.id !== -1 &&
            this.selectedSite.name === 'admin'
        );
    }

    /**
     * Connection to a site
     */
    async connect() {
        try {
            const credentials: ConnectionReq = {
                id: this.selectedSite?.id ?? -1,
                password: this.pass,
            };

            // If the response type is not ConnectionResp, throw err => wrong credentials
            const res = await this.http
                .post<ConnectionResp>(`${this.API_URL}site/login`, credentials)
                .toPromise();

            // Credentials are good, save the site id
            this.selectedSite = {
                id: res.id,
                name: res.name,
                created_at: res.created_at,
                updated_at: res.updated_at,
            };
            localStorage.setItem('siteID', res.id.toString());
            this.pass = '';

            if (this.isAdmin() && !!res.token) {
                // save token
                localStorage.setItem('token', res.token);
                // redirect to the admin page
                this.router.navigate(['admin']);
            }
        } catch (error) {
            this.initConnection();
            alert('Mot de passe incorrect');
        }
    }

    disconnect() {
        try {
            localStorage.removeItem('siteID');
        } catch (error) {
            console.log(error);
        }
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
        this.initConnection();
        this.router.navigate(['/home']);
    }
}
