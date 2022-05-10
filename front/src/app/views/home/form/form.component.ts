import { Order } from './../../../resources/interfaces';
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
    id: number;

    //////////////////// Filters \\\\\\\\\\\\\\\\\\\\

    form: FormGroup;
    filteredOptions_client: Observable<Client[]>;
    filteredOptions_op: Observable<Operator[]>;

    constructor(
        private service: HomeService,
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
            produit: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            operators: new FormArray([new FormControl('')]),
            info: [undefined, []],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.order = await this.service.initOrder(this.id);

        this.operators = await this.service.getOperators();
        this.clients = await this.service.getClients();

        if (this.id != -1) this.initForm();

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

        this.filteredOptions_op =
            this.form.controls.operators.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string'
                        ? value
                        : `${value.name.toUpperCase()} ${value.surname}`
                ),
                map((name) =>
                    name ? this._filter_operators(name) : this.operators.slice()
                )
            );
    }

    /**
     * Fill in form with client information if update
     */
    initForm() {
        this.form.setValue({
            date_chargement: this.order.date_chargement,
            date_dechargement: this.order.date_dechargement,
            client: this.order.client,
            address: this.order.address,
            produit: this.order.produit,
            price: this.order.price,
            operators: this.order?.operators,
            info: this.order.info,
        });
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
                (!!option?.name &&
                    option?.name?.toLowerCase().includes(filterValue)) ||
                option.surname.toLowerCase().includes(filterValue) ||
                option?.company?.toLowerCase().includes(filterValue)
        );
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    /**
     * Add a new operator to the list of operators input
     */
    async addOperator() {
        (this.form.get('operators') as FormArray).push(new FormControl(''));
    }

    /**
     * Remove an operator from the list
     *
     * @param i Index of the operator in the list
     */
    async rmOperator(i: number) {
        (this.form.get('operators') as FormArray).removeAt(i);
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
            produit: this.form.get('produit')?.value,
            info: this.form.get('info')?.value ?? '',
        };

        if (!!this.form.get('operators')) {
            this.order.operators = this.form.get('operators')?.value;
        }

        if (this.id != -1) {
            return this.update();
        }

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
