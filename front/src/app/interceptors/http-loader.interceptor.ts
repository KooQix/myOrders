import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HomeService } from '../views/home/home.service';
import { ProductService } from '../views/product/product.service';
import { ClientsService } from '../views/clients/clients.service';
import { CompanyService } from '../views/company/company.service';
import { OperatorsService } from '../views/operators/operators.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    constructor(
        private homeService: HomeService,
        private clientService: ClientsService,
        private companyService: CompanyService,
        private productService: ProductService,
        private operatorService: OperatorsService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        this.homeService.loading.next(true);
        this.clientService.loading.next(true);
        this.companyService.loading.next(true);
        this.productService.loading.next(true);
        this.operatorService.loading.next(true);

        // Complete the API call
        return next.handle(request).pipe(
            finalize(() => {
                this.homeService.loading.next(false);
                this.clientService.loading.next(false);
                this.companyService.loading.next(false);
                this.productService.loading.next(false);
                this.operatorService.loading.next(false);
            })
        );
    }
}
