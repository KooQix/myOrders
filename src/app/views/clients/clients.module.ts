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
    ],
})
export class ClientsModule {}
