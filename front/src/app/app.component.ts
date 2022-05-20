import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavLinks {
    label: string;
    link: string;
    index: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'myOrders';

    private activeLinkIndex = 0;

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
    constructor(private router: Router) {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex =
                this.navLinks.find((tab) => tab.link === '.' + this.router.url)
                    ?.index ?? 0;
        });
    }
}
