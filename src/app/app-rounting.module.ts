import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ContactComponent } from './shared/pages/contact/contact.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'countries',
        //cargar por lazyload
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'countries/by-capital'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRountingModule {}