import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Client } from 'src/app/resources/interfaces';
import { ClientsService } from '../clients.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    client: Client;
    form: FormGroup;
    formAdd: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: ClientsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
        });

        this.formAdd = this.formBuilder.group({
            code_chantier: [undefined, []],
            city: ['', [Validators.required]],
            zip: [undefined, [Validators.required, Validators.min(0)]],
            street: ['', [Validators.required]],
            number: [undefined, []],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        const id = _id ? parseInt(_id) : -1;
        this.client = await this.service.initClient(id);

        if (this.client.id != -1) this.initForm();
    }

    initForm() {
        this.form.setValue({
            name: this.client.name,
            surname: this.client.surname,
            phone: this.client.phone,
        });

        if (this.client.addresses.length > 0) {
            const address = this.client.addresses[0];
            this.formAdd.setValue({
                code_chantier: address.code_chantier,
                city: address.city,
                zip: address.zip,
                street: address.street,
                number: address.number,
            });
        }
    }

    /**
     * When selecting an address, fill the form with the information to be able to update
     *
     * @param address
     */
    manageSelection(address: Address) {
        this.formAdd.setValue(address);
    }

    /**
     * Check if the address has already been added to the client's list of addresses
     *
     * @returns
     */
    addExists(): boolean {
        for (let address of this.client.addresses) {
            if (
                this.formAdd.get('code_chantier')?.value ==
                    address.code_chantier &&
                this.formAdd.get('city')?.value == address.city &&
                this.formAdd.get('zip')?.value == address.zip &&
                this.formAdd.get('street')?.value == address.street &&
                this.formAdd.get('number')?.value == address.number
            )
                return true;
        }
        return false;
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    /**
     * Add an address to the client's list of addresses
     */
    addAddress(): void {
        // Push address to the list of addresses
        this.client.addresses.push(this.formAdd.value);

        // Reset form, to add an new address
        this.formAdd.reset();
    }

    /**
     * Update the client information
     */
    async update(): Promise<void> {
        await this.service.update(this.client);
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    /**
     * Create a new client
     */
    async save(): Promise<void> {
        this.client.name = this.form.get('name')?.value;
        this.client.surname = this.form.get('surname')?.value;
        this.client.phone = this.form.get('phone')?.value;

        const add = this.form.get('addresses')?.value;
        if (add) {
            this.client.addresses.push(add);
        }

        if (this.client.id != -1) return this.update();

        // Save
        await this.service.create(this.client);
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
