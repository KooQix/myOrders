/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Company, Operator } from 'src/app/resources/interfaces';
import { OperatorsService } from '../operators.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    operator: Operator;
    companies: Company[];
    form: FormGroup;
    id: number;

    filteredOptions_company: Observable<Company[]>;

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
            company: ['', [Validators.required]],
            phone: ['', [Validators.required]],
        });

        this.companies = await this.service.getAllCompanies();

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.operator = await this.service.initOperator(this.id);

        if (this.operator.id != -1) this.initForm();

        this.filteredOptions_company =
            this.form.controls.company.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : `${value.name}`
                ),
                map((name) =>
                    name ? this._filter_companies(name) : this.companies.slice()
                )
            );
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

    /**
     * Update operator
     */
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

    //////////////////// Filter functions \\\\\\\\\\\\\\\\\\\\

    /**
     * How companies are displayed in select
     *
     * @param company
     * @returns
     */
    displayFn_companies(company: Company): string {
        return company.name;
    }

    /**
     * Filter table through companies info
     *
     * @param name
     * @returns
     */
    private _filter_companies(name: string): Company[] {
        const filterValue = name.toLowerCase();

        return this.companies.filter((option) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }
}
