/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { OperatorsRoutingModule } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';
import { FormComponent } from './form/form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OperatorsService } from './operators.service';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loader.interceptor';

@NgModule({
    declarations: [OperatorsComponent, FormComponent],
    imports: [
        CommonModule,
        OperatorsRoutingModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        OperatorsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
    ],
})
export class OperatorsModule {}
