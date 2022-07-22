import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from 'src/app/resources/interfaces';
import { AdminService } from './admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    sites: Site[];

    data: MatTableDataSource<Site>;
    displayedColumns: string[] = [
        'id',
        'name',
        'created_at',
        'updated_at',
        'update',
    ];

    constructor(
        private service: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit(): Promise<void> {
        // try {

        // } catch (error) {

        // }
        this.sites = await this.service.getAllSites();
        for (const site of this.sites) {
            site.created_at = this.formatShortDate(site.created_at);
            site.updated_at = this.formatShortDate(site.updated_at);
        }
        this.data = new MatTableDataSource(this.sites);
    }

    /**
     * Filter table
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.data.filter = filterValue;
    }

    /**
     * Format date
     *
     * @param date
     * @returns
     */
    formatShortDate(date: string) {
        return date.split('T')[0];
    }

    update(id: number) {
        this.router.navigate([`form/${id}`], {
            relativeTo: this.route,
            queryParams: { new: false },
        });
    }
}
