import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from 'src/app/resources/interfaces';

@Component({
    selector: 'app-operators',
    templateUrl: './operators.component.html',
    styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
    operators: Operator[] = [
        {
            id: 1,
            name: 'Name',
            surname: 'Surname',
            phone: 'Phone',
        },
        {
            id: 2,
            name: 'Legout',
            surname: 'Paul',
            phone: 'Phone',
        },
    ];

    displayedColumns: string[] = ['name', 'surname', 'phone', 'modifier'];
    dataSource = new MatTableDataSource(this.operators);

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
     * Redirect to the operator creation page
     */
    createOperator() {
        this.router.navigate(['form/-1'], { relativeTo: this.route });
    }

    /**
     * Redirect to the operator info
     */
    updateOperator(operatorID: number) {
        this.router.navigate([`form/${operatorID}`], {
            relativeTo: this.route,
        });
    }
}
