import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/resources/interfaces';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    displayedColumns: string[] = ['name', 'price', 'modifier'];
    products: Product[];

    dataSource: MatTableDataSource<Product>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ProductService
    ) {}

    async ngOnInit(): Promise<void> {
        this.products = await this.service.getAll();
        this.dataSource = new MatTableDataSource(this.products);
    }

    /**
     * Filter table
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.replace(/ /g, '');
    }

    /**
     * Redirect to the order creation page
     */
    createProduct() {
        this.router.navigate(['form/-1'], { relativeTo: this.route });
    }

    /**
     * Redirect to the command info
     */
    updateProduct(productID: number) {
        this.router.navigate([`form/${productID}`], { relativeTo: this.route });
    }
}
