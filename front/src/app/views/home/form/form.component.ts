/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { Order, Product } from './../../../resources/interfaces';
import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client, Operator } from 'src/app/resources/interfaces';
import { HomeService } from '../home.service';
import { ProductService } from '../../product/product.service';
import { ClientsService } from '../../clients/clients.service';
import { OperatorsService } from '../../operators/operators.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    order: Order;
    datepicker_chargement: any;
    datepicker_dechargement: any;
    clients: Client[];
    operators: Operator[];
    products: Product[];
    id: number;
    duplicate: boolean;

    //////////////////// Filters \\\\\\\\\\\\\\\\\\\\

    form: FormGroup;
    filteredOptions_client: Observable<Client[]>;
    filteredOptions_op: Observable<Operator[]>[] = [];
    filteredOptions_product: Observable<Product[]>;

    constructor(
        private service: HomeService,
        private productService: ProductService,
        private clientService: ClientsService,
        private operatorService: OperatorsService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            date_chargement: ['', [Validators.required]],
            date_dechargement: ['', [Validators.required]],
            client: ['', [Validators.required]],
            address: [undefined, [Validators.required]],
            product: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            tonnage: ['', [Validators.required, Validators.min(0)]],
            deblais: ['', []],
            operators: new FormArray([]),
            info: [undefined, []],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.order = await this.service.initOrder(this.id);

        // Whether it's a new order from a duplication or an order update
        const _new = this.route.snapshot.queryParamMap.get('new');
        this.duplicate = _new == 'true';
        if (this.duplicate) this.order.sent = undefined;

        this.operators = await this.operatorService.getAll();
        this.clients = await this.clientService.getAll();
        this.products = await this.productService.getAll();

        if (this.id != -1) this.initForm();
        else this.addOperator();

        // Get elements from server and fill form

        // Filters
        this.filteredOptions_client =
            this.form.controls.client.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string'
                        ? value
                        : `${value.name.toUpperCase()} ${value.surname}`
                ),
                map((name) =>
                    name ? this._filter_clients(name) : this.clients.slice()
                )
            );

        this.filteredOptions_product =
            this.form.controls.product.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string'
                        ? value
                        : `${value.name.toUpperCase()} (${value.price} €)`
                ),
                map((name) =>
                    name ? this._filter_products(name) : this.products.slice()
                )
            );
    }

    /**
     * Fill in form with client information if update
     */
    initForm() {
        if (!!this.order?.operators) {
            for (const op of this.order?.operators) {
                this.addNewOperator(op);
            }
        }

        this.form.setValue({
            date_chargement: this.order.date_chargement,
            date_dechargement: this.order.date_dechargement,
            client: this.order.client,
            address: this.order.address,
            product: this.order.product,
            price: this.order.price,
            tonnage: this.order.tonnage,
            deblais: this.order.deblais == 0 ? '' : this.order.deblais,
            operators: this.order.operators,
            info: this.order.info,
        });

        if (this.order.operators?.length === 0) this.addOperator();
    }

    //////////////////// Filter functions \\\\\\\\\\\\\\\\\\\\

    /**
     * How clients are displayed in select
     *
     * @param client
     * @returns
     */
    displayFn_clients(client: Client): string {
        return client && client.name
            ? `${client.name.toUpperCase()} ${client.surname}`
            : '';
    }

    /**
     * Filter table through clients info
     *
     * @param name
     * @returns
     */
    private _filter_clients(name: string): Client[] {
        const filterValue = name.toLowerCase();

        return this.clients.filter(
            (option) =>
                option.name.toLowerCase().includes(filterValue) ||
                option.surname.toLowerCase().includes(filterValue)
        );
    }

    /**
     * How operators are displayed in select
     *
     * @param operator
     * @returns
     */
    displayFn_operators(operator: Operator): string {
        return operator && operator.surname
            ? `${operator?.name ? operator?.name.toUpperCase() : ''} ${
                  operator.surname
              }`
            : '';
    }

    /**
     * Filter table through operators info
     *
     * @param name
     * @returns
     */
    private _filter_operators(name: string): Operator[] {
        const filterValue = name.toLowerCase();

        return this.operators.filter(
            (option) =>
                (!!option.name &&
                    option.name?.toLowerCase().includes(filterValue)) ||
                option.surname.toLowerCase().includes(filterValue)
        );
    }

    /**
     * Filter table through product info
     *
     * @param name
     * @returns
     */
    private _filter_products(name: string): Product[] {
        const filterValue = name.trim().toLowerCase();

        return this.products.filter((option) =>
            option.name.trim().toLowerCase().includes(filterValue)
        );
    }

    /**
     * How products are displayed in select
     *
     * @param product
     * @returns
     */
    displayFn_products(product: Product): string {
        return !!product ? `${product.name} (${product.price}€)` : '';
    }

    /**
     * Manage autocomplete for the ith FormControl in the FormArray
     *
     * @param i The form control index, inside the formArray
     */
    manageFormControl(i: number) {
        this.filteredOptions_op[i] = (
            this.form.get('operators') as FormArray
        ).controls[i].valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'string'
                    ? value
                    : `${value.name?.toUpperCase()} ${value.surname}`
            ),
            map((name) =>
                name ? this._filter_operators(name) : this.operators.slice()
            )
        );
    }

    getOpControls() {
        return (this.form.get('operators') as FormArray).controls;
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    /**
     * Add a new operator to the list of operators input
     */
    async addOperator() {
        const op: Operator = {
            id: -1,
            name: '',
            surname: '',
            phone: '',
        };
        this.addNewOperator(op);
    }

    /**
     * Add a new operator to the list of operators input
     */
    private async addNewOperator(operator: Operator) {
        (this.form.get('operators') as FormArray).push(
            new FormControl(operator)
        );
        this.manageFormControl(
            (this.form.get('operators') as FormArray).length - 1
        );
    }

    /**
     * Remove an operator from the list
     *
     * @param i Index of the operator in the list
     */
    async rmOperator(i: number) {
        (this.form.get('operators') as FormArray).removeAt(i - 1);
        this.filteredOptions_op.splice(i - 1);
    }

    /**
     * Update order
     */
    async update() {
        try {
            this.order.id = this.id;
            await this.service.update(this.order);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Create / Update an order
     * @returns
     */
    async save() {
        const formDeblais = this.form.get('deblais')?.value;
        const _deblais = !!formDeblais && formDeblais != '' ? formDeblais : 0;
        this.order = {
            date_chargement: this.service.shortDate(
                new Date(this.form.get('date_chargement')?.value)
            ),
            date_dechargement: this.service.shortDate(
                new Date(this.form.get('date_dechargement')?.value)
            ),
            client: this.form.get('client')?.value,
            address: this.form.get('address')?.value,
            price: this.form.get('price')?.value,
            tonnage: this.form.get('tonnage')?.value,
            deblais: _deblais,
            operators: this.form.get('operators')?.value,
            product: this.form.get('product')?.value,
            info: this.form.get('info')?.value ?? '',
        };

        if (!!this.form.get('operators')) {
            this.order.operators = this.form.get('operators')?.value;
        }

        if (this.id != -1 && !this.duplicate) return await this.update();

        // Save
        try {
            await this.service.create(this.order);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Delete an order
     */
    async deleteOrder() {
        try {
            await this.service.delete(this.order);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Go back to the home page
     */
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
