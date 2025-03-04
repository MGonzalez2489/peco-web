import { Component, effect, inject } from '@angular/core';
import { UiService } from '@core/services';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [Toast],
  providers: [MessageService],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  messageService = inject(MessageService);
  uiService = inject(UiService);

  constructor() {
    effect(() => {
      const msg = this.uiService.message();
      if (msg) {
        this.showSuccess(msg);
      }
    });
  }

  private showSuccess(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmacion',
      detail: msg,
    });
  }
}
