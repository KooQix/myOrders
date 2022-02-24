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
    ],
})
export class OperatorsModule {}
