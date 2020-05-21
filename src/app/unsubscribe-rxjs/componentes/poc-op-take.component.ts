import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-op-take',
  template: `
    <app-poc-base
      [titulo]="titulo"
      [valor]="valor"
      estilo="bg-warning"
    ></app-poc-base>
  `
})
export class PocOpTakeComponent implements OnInit, OnDestroy {
  titulo = 'Componente com operador Take';
  valor: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        take(1)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.titulo} foi destruído`);
  }
}
