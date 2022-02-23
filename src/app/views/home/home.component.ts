import { Client, Operator } from './../../resources/interfaces';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

interface Order {
    date_chargement: string;
    date_dechargement: string;
    client: Client;
    code_chantier: string;
    price: number;
    operator: Operator;
    color?: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    orders: Order[] = [
        {
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            client: {
                name: 'Doe',
                surname: 'John',
                phone: '123',
            },
            code_chantier: '000',
            price: 100.99,
            operator: {
                name: 'NameOp',
                surname: 'operator1',
                phone: '123',
            },
        },
        {
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            client: {
                name: 'Doe',
                surname: 'John',
                phone: '123',
            },
            code_chantier: '000',
            price: 100.99,
            operator: {
                name: 'NameOp',
                surname: 'operator1',
                phone: '123',
            },
        },
        {
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            client: {
                name: 'Legout',
                surname: 'Paul',
                phone: '123',
            },
            code_chantier: '000',
            price: 655.99,
            operator: {
                name: '',
                surname: 'operator1',
                phone: '123',
            },
        },
    ];
    displayedColumns: string[] = [
        'dates',
        'code',
        'price',
        'client',
        'operator',
        'modifier',
    ];
    dataSource = new MatTableDataSource(this.orders);

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        for (const order of this.orders) {
            if (order.operator.name === '')
                order.color = 'rgb(128, 128, 128, 0.3)';
        }
    }

    /**
     * Filter table
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        // Override dataSource filterPredicate to include the filter on client || operator info
        this.dataSource.filterPredicate = (order: Order, filter: string) => {
            filter = filter.trim().toLowerCase();
            return (
                !filter ||
                order.date_chargement.trim().toLowerCase().includes(filter) ||
                order.date_dechargement.trim().toLowerCase().includes(filter) ||
                order.code_chantier.trim().toLowerCase().includes(filter) ||
                order.price.toString().trim().includes(filter) ||
                // Client & Operator
                order.client.name.trim().toLowerCase().includes(filter) ||
                order.client.surname.trim().toLowerCase().includes(filter) ||
                order.client.phone.trim().toLowerCase().includes(filter) ||
                order.operator.name.trim().toLowerCase().includes(filter) ||
                order.operator.surname.trim().toLowerCase().includes(filter) ||
                order.operator.phone.trim().toLowerCase().includes(filter)
            );
        };
        this.dataSource.filter = filterValue;
    }

    /**
     * Redirect to the order creation page
     */
    createOrder() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    /**
     * Redirect to the command info
     */
    updateOrder() {
        this.router.navigate(['update'], { relativeTo: this.route });
    }
}
