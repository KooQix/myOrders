import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/resources/interfaces';
import { CompanyService } from './company.service';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
    companies: Company[];
    displayedColumns: string[] = [
        'name',
        'city',
        'zip',
        'phone',
        'payment',
        'modifier',
    ];
    dataSource: MatTableDataSource<Company>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public service: CompanyService
    ) {}

    async ngOnInit(): Promise<void> {
        this.companies = await this.service.getAll();
        this.dataSource = new MatTableDataSource(this.companies);
    }

    /**
     * Filter table
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.replace(/ /g, '');
    }

    /**
     * Redirect to the order creation page
     */
    createCompany() {
        this.router.navigate(['form/-1'], { relativeTo: this.route });
    }

    /**
     * Redirect to the command info
     */
    updateCompany(companyID: number) {
        this.router.navigate([`form/${companyID}`], { relativeTo: this.route });
    }
}
