import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoResolver } from './guards/curso.resolver';
import { CursosCadComponent } from './cursos-cad/cursos-cad.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  {
    path: 'novo',
    component: CursosCadComponent,
    resolve: {
      curso: CursoResolver
    }
  },
  {
    path: 'editar/:id',
    component: CursosCadComponent,
    resolve: {
      curso: CursoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
