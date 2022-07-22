import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './views/admin/admin.guard';

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
        path: 'companies',
        loadChildren: () =>
            import('./views/company/company.module').then(
                (m) => m.CompanyModule
            ),
    },
    {
        path: 'products',
        loadChildren: () =>
            import('./views/product/product.module').then(
                (m) => m.ProductModule
            ),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./views/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
        canActivateChild: [AdminGuard],
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
    providers: [AdminGuard],
})
export class AppRoutingModule {}
