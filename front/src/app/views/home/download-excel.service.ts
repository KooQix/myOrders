import { Order } from 'src/app/resources/interfaces';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { HomeService } from './home.service';

const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})
export class DownloadExcelService {
    constructor(private service: HomeService) {}

    /**
     * Export json as Excel file
     *
     * @param json
     * @param excelFileName
     */
    public exportAsExcelFile(json: any[], filter: string, date?: any): void {
        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.toString(json)
        );
        const myworkbook: XLSX.WorkBook = {
            Sheets: { data: myworksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(myworkbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, this.getFileName(filter, date));
    }

    /**
     * Save Excel file
     *
     * @param buffer
     * @param fileName
     */
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
    }

    /**
     * Format information for excel file
     *
     * @param json Entry data (list of Order)
     * @returns
     */
    private toString(json: Order[]): any[] {
        let res = [];
        for (let element of json) {
            let operators = '';

            // Operators to string
            if (!!element.operators) {
                for (let i = 0; i < element.operators?.length; i++) {
                    const operator = element.operators[i];
                    operators += operator?.surname
                        ? `${
                              !!operator?.name
                                  ? operator?.name?.toUpperCase() + ' '
                                  : ''
                          }` + `${operator?.surname}`
                        : '';
                    operators += `; telephone: ${operator.phone}`;
                    operators += `; paiement: ${
                        operator.company?.paid_per_day
                            ? 'À la journée'
                            : 'À la tonne'
                    }`;
                    operators += ', ';
                }
            }

            res.push({
                date_chargement: element.date_chargement,
                date_dechargement: element.date_dechargement,
                price: element.price,
                client: `${element.client.name.toUpperCase()} ${
                    element.client.surname
                }`,
                operators: operators,
                adresse: `${element.address.city} ${element.address.street}`,
                info: `${element.info}`,
            });
        }
        return res;
    }

    /**
     * Create output filename
     *
     * @param filter filters bar input
     * @param date date | undefined
     * @returns
     */
    private getFileName(filter: string, date?: any) {
        return `${!!date ? date : 'all'}_${filter}_myOrders`;
    }
}
