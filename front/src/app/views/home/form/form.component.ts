import { Order } from './../../../resources/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            address: ['', [Validators.required]],
            produit: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            operator: ['', []],
            info: ['', []],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.order = await this.service.initOrder(this.id);

        this.operators = await this.service.getOperators();
        this.clients = await this.service.getClients();

        if (this.order.id != -1) this.initForm();

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

        this.filteredOptions_op = this.form.controls.operator.valueChanges.pipe(
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

    initForm() {
        this.form.setValue({
            date_chargement: this.order.date_chargement,
            date_dechargement: this.order.date_dechargement,
            client: this.order.client,
            address: this.order.address,
            produit: this.order.produit,
            price: this.order.price,
            operator: this.order.operator,
            info: this.order.info,
        });
    }

    //////////////////// Filter functions \\\\\\\\\\\\\\\\\\\\

    displayFn_clients(client: Client): string {
        return client && client.name
            ? `${client.name.toUpperCase()} ${client.surname}`
            : '';
    }

    private _filter_clients(name: string): Client[] {
        const filterValue = name.toLowerCase();

        return this.clients.filter(
            (option) =>
                option.name.toLowerCase().includes(filterValue) ||
                option.surname.toLowerCase().includes(filterValue)
        );
    }

    displayFn_operators(operator: Operator): string {
        return operator && operator.name
            ? `${operator.name.toUpperCase()} ${operator.surname}`
            : '';
    }

    private _filter_operators(name: string): Operator[] {
        const filterValue = name.toLowerCase();

        return this.operators.filter(
            (option) =>
                option.name.toLowerCase().includes(filterValue) ||
                option.surname.toLowerCase().includes(filterValue)
        );
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    async update() {
        try {
            await this.service.update(this.order);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    async save() {
        this.order.date_chargement = this.form.get('date_chargement')?.value;
        this.order.date_dechargement =
            this.form.get('date_dechargement')?.value;
        this.order.client = this.form.get('client')?.value;
        this.order.address = this.form.get('address')?.value;
        this.order.price = this.form.get('price')?.value;
        this.order.produit = this.form.get('produit')?.value;
        this.order.operator = this.form.get('operator')?.value ?? '';
        this.order.info = this.form.get('info')?.value ?? '';

        if (this.id != -1) {
            return this.update();
        }

        // Save
        console.log(this.order);
        try {
            await this.service.create(this.order);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
