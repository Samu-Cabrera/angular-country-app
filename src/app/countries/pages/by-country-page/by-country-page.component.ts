import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';
  public loadingSpinner: boolean = false;

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byCountries.countries;
    this.initialValue = this.countriesService.cachStore.byCountries.term;
  }

  searchName(name: string): void {
    this.loadingSpinner = true;

    this.countriesService.searchCountry(name)
      .subscribe(res => {
        this.countries = res;
        this.loadingSpinner = false;
      });
  }

}
