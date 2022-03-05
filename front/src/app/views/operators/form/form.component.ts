import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Operator } from 'src/app/resources/interfaces';
import { OperatorsService } from '../operators.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    operator: Operator;
    form: FormGroup;
    id: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: OperatorsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            name: ['', []],
            surname: ['', [Validators.required]],
            company: [''],
            phone: ['', [Validators.required]],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.operator = await this.service.initOperator(this.id);

        if (this.operator.id != -1) this.initForm();
    }

    /**
     * If update an operator, fill the form with the operator info
     */
    initForm(): void {
        this.form.setValue({
            name: this.operator.name,
            surname: this.operator.surname,
            company: this.operator.company,
            phone: this.operator.phone,
        });
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    async update() {
        try {
            await this.service.update(this.operator);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Create / Update an operator
     *
     * @returns
     */
    async save() {
        this.operator.name = this.form.get('name')?.value;
        this.operator.surname = this.form.get('surname')?.value;
        this.operator.phone = this.form.get('phone')?.value;
        this.operator.company = this.form.get('company')?.value;
        if (this.id != -1) return this.update();

        // Save
        try {
            await this.service.create(this.operator);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Delete an operator
     */
    async deleteOperator() {
        try {
            await this.service.deleteOperator(this.operator);
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
