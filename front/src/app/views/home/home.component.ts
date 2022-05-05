import { Order } from './../../resources/interfaces';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HomeService } from './home.service';
import { DownloadExcelService } from './download-excel.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    datepicker: any;
    date: FormControl;

    orders: Order[];
    displayedColumns: string[] = [
        'dates',
        'produit',
        'price',
        'client',
        'operator',
        'modifier',
    ];
    dataSource: MatTableDataSource<Order>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HomeService,
        private excelService: DownloadExcelService
    ) {}

    async ngOnInit(): Promise<void> {
        // By default, display orders for tomorrow
        this.date = this.service.getTomorrow(new Date());
        this.orders = await this.service.getAllByDate(
            this.service.shortDate(this.date?.value)
        );
        this.dataSource = new MatTableDataSource(this.orders);

        this.date.valueChanges.subscribe((date) => {
            this.manageSelection(date);
        });
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

            const _filter =
                !filter ||
                order.date_chargement.trim().toLowerCase().includes(filter) ||
                order.date_dechargement.trim().toLowerCase().includes(filter) ||
                order.price.toString().trim().includes(filter) ||
                order.produit.toString().trim().includes(filter) ||
                // Client & Operator
                order.client.name.trim().toLowerCase().includes(filter) ||
                order.client.surname.trim().toLowerCase().includes(filter) ||
                order.client.phone.trim().toLowerCase().includes(filter);

            // Operator not filled in
            if (!!!order.operator) return _filter;

            const op = () => {
                if (!!!order.operator) return false;
                for (let elem of order?.operator) {
                    if (
                        !!elem?.name?.trim().toLowerCase().includes(filter) ||
                        elem?.surname.trim().toLowerCase().includes(filter) ||
                        elem?.phone.trim().includes(filter) ||
                        !!elem?.company?.trim().toLowerCase().includes(filter)
                    )
                        return true;
                }
                return false;
            };

            // Operator is filled in
            return _filter || op();
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
    async manageSelection(date: any) {
        if (!!date) {
            this.orders = await this.service.getAllByDate(
                this.service.shortDate(this.date?.value)
            );
        } else {
            this.orders = await this.service.getAll();
        }
        this.dataSource.data = this.orders;
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

    /**
     * Export table as Excel file
     */
    exportExcelFile() {
        const filter = <HTMLInputElement>document.querySelector('.input');
        const date = !!this?.date?.value
            ? this.service.shortDate(this?.date?.value)
            : undefined;
        this.excelService.exportAsExcelFile(
            this.dataSource.data,
            filter?.value,
            date
        );
    }
}
