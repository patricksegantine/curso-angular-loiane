import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-op-take-until',
  template: `
    <app-poc-base
      [titulo]="titulo"
      [valor]="valor"
      estilo="bg-warning"
    ></app-poc-base>
  `
})
export class PocOpTakeUntilComponent implements OnInit, OnDestroy {
  titulo = 'Componente com operador Take Until';
  valor: string;

  unsub$ = new Subject<string>();

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor().pipe(
      tap(v => console.log(this.titulo, v)),
      takeUntil(this.unsub$)
    )
    .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
    console.log(`${this.titulo} foi destruído`);
  }
}
