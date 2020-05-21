import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: UnsubscribePocComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnsubscribeRxJsRoutingModule { }
