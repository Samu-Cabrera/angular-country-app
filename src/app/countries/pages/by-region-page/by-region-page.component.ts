import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
    `
      button{
        box-shadow: 3px 8px 12px rgba(0,0,0,.1);
      }
    `
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cachStore.byRegion.region;
  }

  public loadingSpinner: boolean = false;

  searchByRegion(region: Region): void {
    this.selectedRegion = region;

    this.loadingSpinner = true;
    
    this.countriesService.searchRegion(region)
      .subscribe(res => {
        this.countries = res;
        this.loadingSpinner = false;
      });


  }
}
