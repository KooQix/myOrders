import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operator } from 'src/app/resources/interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OperatorsService {
    private readonly API_URL = env.API_URL;

    constructor(private http: HttpClient) {}

    /**
     * Initialize operator (empty if operatorID == -1, with operator info otherwise)
     *
     * @param operatorID
     * @returns
     */
    initOperator(operatorID: number): Promise<Operator> | Operator {
        if (operatorID !== -1) {
            return this.http
                .get<Operator>(`${this.API_URL}operator/${operatorID}`)
                .toPromise();
        }
        return {
            id: -1,
            name: '',
            surname: '',
            phone: '',
        };
    }

    /**
     * Get all operators
     *
     * @returns
     */
    getAll(): Promise<Operator[]> {
        return this.http.get<Operator[]>(`${this.API_URL}operator`).toPromise();
    }

    /**
     * Update a operator
     *
     * @param operator
     */
    update(operator: Operator): Promise<Operator> {
        const id = operator.id;
        delete operator.id;
        return this.http
            .patch<Operator>(`${this.API_URL}operator/${id}`, operator)
            .toPromise();
    }

    /**
     * Create a new operator
     *
     * @param operator
     * @returns
     */
    create(operator: Operator): Promise<Operator> {
        delete operator.id;
        return this.http
            .post<Operator>(`${this.API_URL}operator`, operator)
            .toPromise();
    }

    /**
     * Delete an operator
     *
     * @param operator
     * @returns
     */
    deleteOperator(operator: Operator): Promise<Operator> {
        return this.http
            .delete<Operator>(`${this.API_URL}operator/${operator.id}`)
            .toPromise();
    }
}
