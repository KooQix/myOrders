import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Site } from 'src/app/resources/interfaces';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    id: number;
    form: FormGroup;
    filteredOptions_sites: Observable<Site[]>;

    site: Site;

    sites: Site[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private service: AdminService,
        private router: Router
    ) {}

    async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });

        // Get elements from server and fill form
        const _id = this.route.snapshot.paramMap.get('id');
        this.id = _id ? parseInt(_id) : -1;
        this.site = await this.service.initSite(this.id);

        this.sites = await this.service.getAllSites();

        if (this.id != -1) this.initForm();

        this.isDisabled();
    }

    initForm() {
        this.form.setValue({
            name: this.site.name,
            password: '*******',
        });
    }

    async save() {
        this.site = {
            id: this.id,
            name: this.form.get('name')?.value,
            password: this.form.get('password')?.value,
            created_at: '',
            updated_at: '',
        };

        if (this.id !== -1) return this.update();

        // Save
        try {
            await this.service.create(this.site);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Update order
     */
    async update() {
        try {
            this.site.id = this.id;
            await this.service.update(this.site);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Delete an order
     */
    async deleteSite() {
        try {
            await this.service.delete(this.site);
            this.router.navigate(['..'], { relativeTo: this.route });
        } catch (error: any) {
            alert(error.error.message);
        }
    }

    /**
     * Go back to the home page
     */
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    isDisabled() {
        const name = this.form.get('name')?.value;
        if (name === 'admin') this.form.controls.name.disable();
    }
}
