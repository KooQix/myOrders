import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/resources/interfaces';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    product: Product;
    form: FormGroup;
    id: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: ProductService
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],
        });

        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.product = await this.service.initProduct(this.id);

        if (this.product.id != -1) this.initForm();
    }

    /**
     * If update a company, fill the form with the company info
     */
    async initForm(): Promise<void> {
        this.form.setValue({
            name: this.product.name,
            price: this.product.price,
        });
    }

    /**
     * Update company
     */
    async update() {
        try {
            await this.service.update(this.product);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Create / Update an company
     *
     * @returns
     */
    async save() {
        this.product.name = this.form.get('name')?.value;
        this.product.price = this.form.get('price')?.value;

        if (this.id != -1) return this.update();

        // Save
        try {
            await this.service.create(this.product);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Delete an company
     */
    async delete() {
        try {
            await this.service.delete(this.product);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Go back to the operators page
     */
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
