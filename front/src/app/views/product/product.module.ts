/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loader.interceptor';

@NgModule({
    declarations: [ProductComponent, FormComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        HttpClientModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
    ],
})
export class ProductModule {}
