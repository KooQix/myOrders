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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: OperatorsService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
        });
        // If id of the order given => update the order, else create one
        this.route.params.subscribe((params) => {
            this.operator = this.service.initOperator(params.id ?? -1);
        });

        // Get elements from server and fill form
    }

    //////////////////// Buttons \\\\\\\\\\\\\\\\\\\\

    update() {
        // Update
    }

    save() {
        this.operator.id = this.form.get('id')?.value ?? -1;
        this.operator.name = this.form.get('name')?.value;
        this.operator.surname = this.form.get('surname')?.value;
        this.operator.phone = this.form.get('phone')?.value;
        if (this.operator.id != -1) {
            return this.update();
        }

        // Save
        console.log(this.operator);
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
