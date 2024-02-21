import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  templateUrl: './by-capital.component.html',
  styleUrls: ['./by-capital.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public loadingSpinner: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countryService.cachStore.byCapital.countries;
    this.initialValue = this.countryService.cachStore.byCapital.term;
  }

  searchByCapital(termino: string): void {
    this.loadingSpinner = true;

    this.countryService.searchCapital(termino)
      .subscribe(res => {
        this.countries = res;
        this.loadingSpinner = false;
      });
  }
}
