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
    sendButtonEnabled: boolean;

    orders: Order[];
    displayedColumns: string[] = [
        'dates',
        'produit',
        'product_price',
        'price', // Transport price
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
        this.sendButtonEnabled = true;

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
            filter = filter.trim().toLowerCase().replace(/ /g, '');
            console.log(filter);

            const _filter =
                !filter ||
                order.date_chargement.trim().toLowerCase().includes(filter) ||
                order.date_dechargement.trim().toLowerCase().includes(filter) ||
                order.price.toString().trim().includes(filter) ||
                order.product.name.toString().trim().includes(filter);

            const clientFilter = () => {
                const toStr =
                    `${order.client.name}${order.client.surname}${order.client.phone}`
                        .trim()
                        .toLowerCase();
                return toStr.includes(filter);
            };

            const opFilters = () => {
                if (!!!order.operators) return false;
                for (const op of order.operators) {
                    const toStr = `${op.name}${op.surname}${op.phone}`
                        .trim()
                        .toLowerCase();
                    if (toStr.includes(filter)) return true;
                }
                return false;
            };

            // Operator is filled in
            return _filter || opFilters() || clientFilter();
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
            this.sendButtonEnabled = true;
            this.orders = await this.service.getAllByDate(
                this.service.shortDate(this.date?.value)
            );
        } else {
            this.orders = await this.service.getAll();

            // No date => disable send message button
            this.sendButtonEnabled = false;
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

    /**
     * Send the messages of the orders for the given date
     *
     * @returns List of sent messages
     */
    sendMessages() {
        if (!!!this.date) return;

        const date = this.service.shortDate(this.date?.value);
        if (date) {
            const sentMessages = this.service.sendMessages(date);
            console.log(sentMessages);
        }
    }
}
