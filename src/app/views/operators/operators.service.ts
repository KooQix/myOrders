import { Injectable } from '@angular/core';
import { Operator } from 'src/app/resources/interfaces';

@Injectable({
    providedIn: 'root',
})
export class OperatorsService {
    constructor() {}

    initOperator(operatorID: number): Operator {
        // if (operatorID !== -1) {}
        return {
            id: -1,
            name: '',
            surname: '',
            phone: '',
        };
    }
}
