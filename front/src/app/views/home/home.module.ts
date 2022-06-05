import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from './form/form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DownloadExcelService } from './download-excel.service';
import { HomeService } from './home.service';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loader.interceptor';

@NgModule({
    declarations: [HomeComponent, FormComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatSelectModule,
        HttpClientModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        DownloadExcelService,
        HomeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
    ],
})
export class HomeModule {}
