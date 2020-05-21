import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'busca-reativa'
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then(mod => mod.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload-download-file/file.module').then(
        mod => mod.FileModule
      )
  },
  {
    path: 'busca-reativa',
    loadChildren: () =>
      import('./busca-reativa/busca-reativa.module').then(
        mod => mod.BuscaReativaModule
      )
  },
  {
    path: 'rxjs-poc',
    loadChildren: () =>
      import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(
        mod => mod.UnsubscribeRxJsModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
