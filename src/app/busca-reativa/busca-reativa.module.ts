import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BuscaReativaRoutingModule } from './busca-reativa-routing';
import { LibSearchComponent } from './lib-search/lib-search.component';


@NgModule({
  declarations: [LibSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscaReativaRoutingModule
  ]
})
export class BuscaReativaModule { }
