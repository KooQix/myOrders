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
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.date = new FormControl(tomorrow);

        // this.orders = await this.service.getAllByDate(
        //     this.shortDate(this.date?.value)
        // );
        this.orders = await this.service.getAll();
        this.dataSource = new MatTableDataSource(this.orders);
        for (const order of this.orders) {
            if (!!!order.operator?.name)
                order.color = 'rgb(128, 128, 128, 0.3)';
        }

        const input = <HTMLInputElement>document.querySelector('.date');
        input?.addEventListener('change', this.manageSelection);

        this.convDatesFormat();
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

            // Operator is filled in
            return (
                _filter ||
                !!order.operator?.name?.trim().toLowerCase().includes(filter) ||
                order.operator?.surname.trim().toLowerCase().includes(filter) ||
                order.operator?.phone.trim().includes(filter) ||
                !!order.operator?.company?.trim().toLowerCase().includes(filter)
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
    async manageSelection() {
        console.log('changed');
        console.log(await this.service.getAll());

        if (!!this.date?.value) {
            this.orders = await this.service.getAllByDate(
                this.shortDate(this.date?.value)
            );
        } else {
            console.log(await this.service.getAll());
            // this.orders = await this.service.getAll();
        }
        // this.dataSource.data = this.orders;
        console.log(this.orders);
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

    convDatesFormat() {
        for (let order of this.orders) {
            order.date_chargement = this.dateFormat(
                new Date(order.date_chargement)
            );
            order.date_dechargement = this.dateFormat(
                new Date(order.date_dechargement)
            );
        }
    }

    dateFormat(date: Date) {
        return date.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    }

    shortDate(date: Date) {
        return this.dateFormat(date).split(', ')[0];
    }

    /**
     * Export table as Excel file
     */
    exportExcelFile() {
        const filter = <HTMLInputElement>document.querySelector('.input');
        const date = this.dateFormat(this?.date.value).split(', ')[0];
        this.excelService.exportAsExcelFile(
            this.dataSource.data,
            filter?.value,
            date
        );
    }
}
