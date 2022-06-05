import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly API_URL = env.API_URL;
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );

    constructor(private http: HttpClient) {}

    /**
     * Init a product when trying to create / update one
     * If id == -1 => create a product, else update it
     *
     * @param productID
     * @returns
     */
    initProduct(productID: number): Promise<Product> | Product {
        if (productID !== -1) {
            return this.http
                .get<Product>(`${this.API_URL}product/${productID}`)
                .toPromise();
        }
        return {
            id: -1,
            name: '',
            price: 0,
        };
    }

    /**
     * Get all companies
     *
     * @returns
     */
    getAll(): Promise<Product[]> {
        return this.http.get<Product[]>(`${this.API_URL}product`).toPromise();
    }

    /**
     * Update a product
     *
     * @param product
     */
    async update(product: Product): Promise<Product> {
        const id = product.id;
        return this.http
            .patch<Product>(`${this.API_URL}product/${id}`, product)
            .toPromise();
    }

    /**
     * Create a new product
     *
     * @param product
     * @returns
     */
    create(product: Product): Promise<Product> {
        delete product.id;
        return this.http
            .post<Product>(`${this.API_URL}product`, product)
            .toPromise();
    }

    /**
     * Delete a product
     *
     * @param product
     * @returns
     */
    async delete(product: Product): Promise<Product> {
        return this.http
            .delete<Product>(`${this.API_URL}product/${product.id}`)
            .toPromise();
    }
}
