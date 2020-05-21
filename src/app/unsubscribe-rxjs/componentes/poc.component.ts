import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base
      [titulo]="titulo"
      [valor]="valor"
      estilo="bg-danger"
    ></app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {
  titulo = 'Componente sem unsubscribe';
  valor: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(tap(v => console.log(this.titulo, v)))
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.titulo} foi destruído`);
  }
}
