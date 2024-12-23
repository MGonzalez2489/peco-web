import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Account } from '@core/models/api';
import { AccountDto } from '@core/models/dtos';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccountById } from '@store/selectors/account.selectors';
import { map, Observable, take } from 'rxjs';
import { PaginationMetaModel } from '@core/models/responses';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements Resolve<Account | undefined> {
  private reqService = inject(RequestService);
  private store$ = inject(Store);
  private route = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Account | undefined> {
    const accountId = route.params['accountId'];

    return this.store$.select(selectAccountById(accountId)).pipe(
      take(1),
      map((account) => {
        if (!account) {
          this.route.navigate(['/']);
        }
        return account;
      }),
    );
  }

  getAll(pageOptions?: PaginationMetaModel) {
    return this.reqService.getList<Account>('accounts', pageOptions);
  }
  create(dto: AccountDto) {
    return this.reqService.post<Account>('accounts', dto);
  }
  getById(accountId: string) {
    return this.reqService.get<Account>('accounts/' + accountId);
  }
}
