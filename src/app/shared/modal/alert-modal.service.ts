import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/modal/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { take, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  showError(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 2000);
  }

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.tipoAlerta = type;
    bsModalRef.content.mensagem = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showConfirm(
    title: string,
    message: string,
    okButtonText?: string,
    cancelButtonText?: string
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (okButtonText) {
      bsModalRef.content.okButtonText = okButtonText;
    }

    if (cancelButtonText) {
      bsModalRef.content.cancelButtonText = cancelButtonText;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult
      .asObservable()
      .pipe(take(1));
  }
}
