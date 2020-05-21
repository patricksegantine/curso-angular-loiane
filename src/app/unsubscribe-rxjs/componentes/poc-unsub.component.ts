import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base
      [titulo]="titulo"
      [valor]="valor"
      estilo="bg-danger"
    ></app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {
  titulo = 'Componente com unsubscribe';
  valor: string;

  sub: Subscription;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.sub = this.service.getValor()
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log(`${this.titulo} foi destruído`);
  }
}
