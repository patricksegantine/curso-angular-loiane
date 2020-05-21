import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base
      [titulo]="titulo"
      estilo="bg-danger"
      [valor]="valor$ | async"
    ></app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {
  titulo = 'Componente com async';
  valor$: Observable<string>;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.valor$ = this.service.getValor();
  }

  ngOnDestroy() {
    console.log(`${this.titulo} foi destruído`);
  }
}
