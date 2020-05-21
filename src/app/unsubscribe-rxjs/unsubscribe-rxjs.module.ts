import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxJsRoutingModule } from './unsubscribe-rxjs-routing';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocBaseComponent } from './base/poc-base.component';
import { PocComponent } from './componentes/poc.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocOpTakeUntilComponent } from './componentes/poc-op-take-until.component';
import { PocOpTakeComponent } from './componentes/poc-op-take.component';

@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocBaseComponent,
    PocComponent,
    PocUnsubComponent,
    PocAsyncComponent,
    PocOpTakeUntilComponent,
    PocOpTakeComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxJsRoutingModule,
  ]
})
export class UnsubscribeRxJsModule { }
