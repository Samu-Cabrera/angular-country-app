import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  //crear un nuevo observable
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public pleaceholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output() public onValue = new EventEmitter<string>;

  @Output() public onDebounce = new EventEmitter<string>;

  //se ejecuta cuando inicia el componente
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      //espera 500 ms sino recibe mas valores se ejecuta
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  //hace una limpieza de observables (no es necesario hacer en los obs de httpClient)
  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value)
  }

  onKeyPress(term: string): void {
    this.debouncer.next(term);
  }

}
