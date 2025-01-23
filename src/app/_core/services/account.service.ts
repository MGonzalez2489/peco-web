import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Account } from '@core/models/entities';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);
  private store$ = inject(Store);
  private route = inject(Router);

  getAll() {
    return this.reqService.getList<Account>('accounts');
  }
  create(dto: Account) {
    return this.reqService.post<Account>('accounts', dto);
  }
  getById(accountId: string) {
    return this.reqService.get<Account>('accounts/' + accountId);
  }
}
