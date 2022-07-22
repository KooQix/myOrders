/**
 * @author LEGOUT Paul legoutpaul@gmail.com
 * @date 2022
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
    },
    {
        path: 'form/:id',
        component: FormComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
