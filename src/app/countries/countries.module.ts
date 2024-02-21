import { CountryPageComponent } from './pages/country-page/country-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRountingModule } from './countries-rounting.module';
import { SharedModule } from '../shared/shared.module';

import { ByCapitalPageComponent } from './pages/by-capital/by-capital.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryTableComponent } from './components/country-table/country-table.component';



@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    CountryPageComponent,
    ByRegionPageComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    CountriesRountingModule,
    SharedModule
  ]
})
export class CountriesModule { }
