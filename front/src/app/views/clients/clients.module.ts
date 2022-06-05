import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loader.interceptor';
import { ClientsService } from './clients.service';

@NgModule({
    declarations: [ClientsComponent, FormComponent],
    imports: [
        CommonModule,
        ClientsRoutingModule,
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
        ClientsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
    ],
})
export class ClientsModule {}
