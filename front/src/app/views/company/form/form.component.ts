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
            paid_per_day: [false, [Validators.required]],
        });

        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.company = await this.service.initCompany(this.id);

        if (this.company.id != -1) this.initForm();
    }

    /**
     * If update a company, fill the form with the company info
     */
     initForm(): void {
        this.form.setValue({
            name: this.company.name,
            city: this.company.city,
            zip: this.company.zip,
            phone: this.company.phone,
        });
    }
}
