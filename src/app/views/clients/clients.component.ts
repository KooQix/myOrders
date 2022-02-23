import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/resources/interfaces';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    clients: Client[] = [];
    displayedColumns: string[] = [
        'dates',
        'code',
        'price',
        'client',
        'operator',
        'modifier',
    ];
    dataSource = new MatTableDataSource(this.clients);
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}

    /**
     * Filter table
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        // Override dataSource filterPredicate to include the filter on client || operator info
        // this.dataSource.filterPredicate = (order: Order, filter: string) => {
        //     filter = filter.trim().toLowerCase();
        //     return (
        //         !filter ||
        //         order.date_chargement.trim().toLowerCase().includes(filter) ||
        //         order.date_dechargement.trim().toLowerCase().includes(filter) ||
        //         order.code_chantier.trim().toLowerCase().includes(filter) ||
        //         order.price.toString().trim().includes(filter) ||
        //         // Client & Operator
        //         order.client.name.trim().toLowerCase().includes(filter) ||
        //         order.client.surname.trim().toLowerCase().includes(filter) ||
        //         order.client.phone.trim().toLowerCase().includes(filter) ||
        //         order.operator.name.trim().toLowerCase().includes(filter) ||
        //         order.operator.surname.trim().toLowerCase().includes(filter) ||
        //         order.operator.phone.trim().toLowerCase().includes(filter)
        //     );
        // };
        this.dataSource.filter = filterValue;
    }

    /**
     * Redirect to the client creation page
     */
    createClient() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    /**
     * Redirect to the client info
     */
    updateClient() {
        this.router.navigate(['update'], { relativeTo: this.route });
    }
}
