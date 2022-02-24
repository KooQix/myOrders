import { Order } from './../../resources/interfaces';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    datepicker: any;
    date = new FormControl(new Date());

    orders: Order[] = [
        {
            id: 1,
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            produit: 'produit',
            client: {
                id: 1,
                name: 'Doe',
                surname: 'John',
                phone: '123',
                addresses: [
                    {
                        code_chantier: '000',
                        city: 'Paris',
                        zip: 75000,
                        street: 'Paris',
                    },
                ],
            },
            address: {
                city: '',
                street: '',
                zip: 75,
            },
            price: 100.99,
            operator: {
                id: 1,
                name: 'NameOp',
                surname: 'operator1',
                phone: '123',
            },
        },
        {
            id: 2,
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            produit: 'produit',
            client: {
                id: 2,
                name: 'Doe',
                surname: 'John',
                phone: '123',
                addresses: [
                    {
                        code_chantier: '000',
                        city: 'Paris',
                        zip: 75000,
                        street: 'Paris',
                    },
                ],
            },
            address: {
                city: '',
                street: '',
                zip: 75,
            },
            price: 100.99,
            operator: {
                id: 2,
                name: 'NameOp',
                surname: 'operator1',
                phone: '123',
            },
        },
        {
            id: 3,
            date_chargement: '23.02.2022',
            date_dechargement: '24.02.2022',
            produit: 'produit',
            client: {
                id: 3,
                name: 'Legout',
                surname: 'Paul',
                phone: '123',
                addresses: [
                    {
                        code_chantier: '000',
                        city: 'Paris',
                        zip: 75000,
                        street: 'Paris',
                    },
                ],
            },
            address: {
                city: '',
                street: '',
                zip: 75,
            },
            price: 655.99,
            operator: {
                id: 3,
                name: '',
                surname: '',
                phone: '',
            },
        },
    ];
    displayedColumns: string[] = [
        'dates',
        'produit',
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

        const input = <HTMLInputElement>document.querySelector('.date');
        input?.addEventListener('change', this.manageSelection);
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
                order.price.toString().trim().includes(filter) ||
                order.produit.toString().trim().includes(filter) ||
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
     * Manage date selection & display data according to the given date.
     *
     * By default, date of the day
     *
     * If empty => show the whole set of data
     */
    manageSelection() {
        console.log('changed');
    }

    /**
     * Redirect to the order creation page
     */
    createOrder() {
        this.router.navigate(['form/-1'], { relativeTo: this.route });
    }

    /**
     * Redirect to the order info
     */
    updateOrder(orderID: number) {
        this.router.navigate([`form/${orderID}`], { relativeTo: this.route });
    }
}
