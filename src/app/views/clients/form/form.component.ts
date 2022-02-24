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

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
        });

        this.formAdd = this.formBuilder.group({
            code_chantier: ['', []],
            city: ['', [Validators.required]],
            zip: [undefined, [Validators.required, Validators.min(0)]],
            street: ['', [Validators.required]],
            number: ['', []],
        });

        // If id of the order given => update the order, else create one
        this.route.params.subscribe((params) => {
            this.client = this.service.initClient(params.id ?? -1);
        });

        // Get elements from server and fill form
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
    update(): void {
        // Update
    }

    /**
     * Create a new client
     */
    save(): void {
        this.client.id = this.form.get('id')?.value ?? -1;
        this.client.name = this.form.get('name')?.value;
        this.client.surname = this.form.get('surname')?.value;
        this.client.phone = this.form.get('phone')?.value;

        const add = this.form.get('addresses')?.value;
        if (add) {
            this.client.addresses.push(add);
        }

        if (this.client.id != -1) {
            return this.update();
        }

        // Save
        console.log(this.client);
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
