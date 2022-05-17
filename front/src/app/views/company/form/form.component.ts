import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/resources/interfaces';
import { CompanyService } from '../company.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    company: Company;
    form: FormGroup;
    id: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: CompanyService
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            city: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            paid_per_day: [undefined, [Validators.required]],
        });

        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.company = await this.service.initCompany(this.id);

        if (this.company.id != -1) this.initForm();
    }

    /**
     * If update a company, fill the form with the company info
     */
    async initForm(): Promise<void> {
        this.form.setValue({
            name: this.company.name,
            city: this.company.city,
            zip: this.company.zip,
            phone: this.company.phone,
            paid_per_day: this.company.paid_per_day ? 'true' : 'false',
        });
        this.company.operators = await this.service.getAllOperators(
            this.company.id ?? -1
        );
    }

    /**
     * Update company
     */
    async update() {
        try {
            await this.service.update(this.company);
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
        this.company.name = this.form.get('name')?.value;
        this.company.city = this.form.get('city')?.value;
        this.company.zip = this.form.get('zip')?.value;
        this.company.phone = this.form.get('phone')?.value;
        this.company.paid_per_day =
            this.form.get('paid_per_day')?.value == 'true';

        if (this.id != -1) return this.update();

        // Save
        try {
            await this.service.create(this.company);
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
            await this.service.delete(this.company);
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

    redirectOperator(id: number) {
        if (id === -1) return;
        this.router.navigate([`operators/form/${id}`]);
    }
}
