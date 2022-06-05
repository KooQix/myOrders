import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Company, Operator } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private readonly API_URL = env.API_URL;
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );

    constructor(private http: HttpClient) {}

    /**
     * Init a company when trying to create / update one
     * If id == -1 => create a company, else update it
     *
     * @param companyID
     * @returns
     */
    initCompany(companyID: number): Promise<Company> | Company {
        if (companyID !== -1) {
            return this.http
                .get<Company>(`${this.API_URL}company/${companyID}`)
                .toPromise();
        }
        return {
            id: -1,
            name: '',
            city: '',
            zip: '',
            phone: '',
            paid_per_day: false,
            operators: [],
        };
    }

    /**
     * Get all companies
     *
     * @returns
     */
    getAll(): Promise<Company[]> {
        return this.http.get<Company[]>(`${this.API_URL}company`).toPromise();
    }

    /**
     * Get all operators for a given company
     *
     * @returns
     */
    getAllOperators(id: number): Promise<Operator[]> {
        return this.http
            .get<Operator[]>(`${this.API_URL}company/operators/${id}`)
            .toPromise();
    }

    /**
     * Update a company
     *
     * @param company
     */
    async update(company: Company): Promise<Company> {
        const id = company.id;
        delete company.operators;
        return this.http
            .patch<Company>(`${this.API_URL}company/${id}`, company)
            .toPromise();
    }

    /**
     * Create a new company
     *
     * @param company
     * @returns
     */
    create(company: Company): Promise<Company> {
        delete company.id;
        return this.http
            .post<Company>(`${this.API_URL}company`, company)
            .toPromise();
    }

    /**
     * Delete a company
     *
     * @param company
     * @returns
     */
    async delete(company: Company): Promise<Company> {
        return this.http
            .delete<Company>(`${this.API_URL}company/${company.id}`)
            .toPromise();
    }
}
