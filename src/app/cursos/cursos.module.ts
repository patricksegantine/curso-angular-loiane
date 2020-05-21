import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosCadComponent } from './cursos-cad/cursos-cad.component';


@NgModule({
  declarations: [CursosListaComponent, CursosCadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CursosRoutingModule,
  ]
})
export class CursosModule { }
