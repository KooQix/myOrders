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
    clients: Client[] = [
        {
            id: 1,
            name: 'Name',
            surname: 'Client1',
            phone: '1223',
            addresses: [
                {
                    code_chantier: '000',
                    city: 'Paris',
                    zip: 75000,
                    street: 'Paris',
                },
            ],
        },
        {
            id: 2,
            name: 'Name',
            surname: 'Client2',
            phone: '1223',
            addresses: [
                {
                    code_chantier: '000',
                    city: 'Paris',
                    zip: 75000,
                    street: 'Paris',
                },
            ],
        },
    ];
    operators: Operator[] = [
        {
            id: 1,
            name: 'Name',
            surname: 'Operator1',
            phone: '1223',
        },
        {
            id: 2,
            name: 'Name',
            surname: 'Paul',
            phone: '1223',
        },
    ];

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

    ngOnInit(): void {
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

        // If id of the order given => update the order, else create one
        this.route.params.subscribe((params) => {
            this.order = this.service.initOrder(params.id ?? -1);
        });

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

    update() {
        // Update
    }

    save() {
        this.order.date_chargement = this.form.get('date_chargement')?.value;
        this.order.date_dechargement =
            this.form.get('date_dechargement')?.value;
        this.order.client = this.form.get('client')?.value;
        this.order.address = this.form.get('address')?.value;
        this.order.price = this.form.get('price')?.value;
        this.order.produit = this.form.get('produit')?.value;
        this.order.operator = this.form.get('operator')?.value ?? '';
        this.order.info = this.form.get('info')?.value ?? '';

        if (this.order.id != -1) {
            return this.update();
        }

        // Save
        console.log(this.order);
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
