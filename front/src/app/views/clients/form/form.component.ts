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
    selectedAddress: Address | undefined;
    id: number;

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
        this.id = _id ? parseInt(_id) : -1;
        this.client = await this.service.initClient(this.id);

        if (this.client.id != -1) this.initForm();
    }

    /**
     * If update, fill in the form with the client's information
     */
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
            this.selectedAddress = address;
        }
    }

    /**
     * When selecting an address, fill the form with the information to be able to update
     *
     * @param address
     */
    manageSelection(address?: Address) {
        if (address) {
            this.formAdd.setValue({
                code_chantier: address.code_chantier,
                city: address.city,
                zip: address.zip,
                street: address.street,
                number: address.number,
            });
            this.selectedAddress = address;

            // Creating a new address
        } else {
            this.formAdd.reset();
            this.selectedAddress = undefined;
        }
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
        // Update
        if (this.selectedAddress !== undefined) {
            const index = this.client.addresses.findIndex(
                (address) => address.id === this.selectedAddress?.id
            );
            this.client.addresses[index] = {
                id: this.selectedAddress.id,
                ...this.formAdd.value,
            };
            return;
        }

        // Create
        // Push address to the list of addresses
        this.client.addresses.push(this.formAdd.value);
        // Reset form, to add an new address
        this.formAdd.reset();
    }

    /**
     * Delete an address from the client's list of addresses
     */
    async deleteAdd() {
        try {
            // Remove from list on front
            if (this.selectedAddress) {
                await this.service.deleteAdd(this.selectedAddress?.id);
                const index = this.client.addresses.indexOf(
                    this.selectedAddress
                );
                this.client.addresses.splice(index, 1);
                this.manageSelection(this.client.addresses[0]);
            }
            // delete address on back
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Update the client information
     */
    async update(): Promise<void> {
        try {
            await this.service.update(this.client);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
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

        if (this.id != -1) return this.update();

        // Save
        try {
            await this.service.create(this.client);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Delete a client
     */
    async deleteClient() {
        try {
            await this.service.deleteClient(this.client);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Go back to home page
     */
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
