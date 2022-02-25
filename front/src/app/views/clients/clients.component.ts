import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/resources/interfaces';
import { ClientsService } from './clients.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    clients: Client[];
    displayedColumns: string[] = ['name', 'surname', 'phone', 'modifier'];
    dataSource: MatTableDataSource<Client>;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ClientsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.clients = await this.service.getAll();
        this.dataSource = new MatTableDataSource(this.clients);
    }

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
     * Redirect to the order creation page
     */
    createClient() {
        this.router.navigate(['form/-1'], { relativeTo: this.route });
    }

    /**
     * Redirect to the command info
     */
    updateClient(clientID: number) {
        this.router.navigate([`form/${clientID}`], { relativeTo: this.route });
    }
}
