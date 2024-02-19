import { CountryPageComponent } from './pages/country-page/country-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRountingModule } from './countries-rounting.module';

import { ByCapitalPageComponent } from './pages/by-capital/by-capital.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';



@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    CountryPageComponent,
    ByRegionPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRountingModule
  ]
})
export class CountriesModule { }
