import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from './modal/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
