import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path: 'home',
        loadChildren: () =>
            import('./views/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'operators',
        loadChildren: () =>
            import('./views/operators/operators.module').then(
                (m) => m.OperatorsModule
            ),
    },
    {
        path: 'clients',
        loadChildren: () =>
            import('./views/clients/clients.module').then(
                (m) => m.ClientsModule
            ),
    },
    {
        path: 'entreprises',
        loadChildren: () =>
            import('./views/company/company.module').then(
                (m) => m.CompanyModule
            ),
    },
    // Default, return to appcomponent
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
