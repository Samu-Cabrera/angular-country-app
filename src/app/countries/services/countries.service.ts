import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CachStore } from '../interfaces/cach-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public apiUrl: string = 'https://restcountries.com/v3.1';

  //para mantener la data 
  public cachStore: CachStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) { 
    this.loadLocalStore();
  }

  //metodos para guardar y leer datos del localstorage
  private saveLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cachStore));
  }
  private loadLocalStore(): void {
    if(!localStorage.getItem('cacheStore')) return;

    this.cachStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  //centraliza la peticion
  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of( [] ) ),
        // delay(1500)
    );
  }

  //busqueda por alpha code
  searchByAlphaCode(code: string): Observable<Country | null>{
    const url: string = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

  //se define el servicio
  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
    .pipe(
      //asigna al objeto cachestore para que la data se mantenga
      tap(countries => this.cachStore.byCapital = { term, countries }),
      tap( () => this.saveLocalStorage())
    )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cachStore.byCountries = { term, countries }),
        tap( () => this.saveLocalStorage())
      )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `https://restcountries.com/v3.1/region/${ region }`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cachStore.byRegion = { region, countries }),
        tap( () => this.saveLocalStorage())
      );
  }
}
