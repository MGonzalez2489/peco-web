import { BaseEntity } from './_base.entity';
import { AccountType } from './account-type.entity';

export interface Account extends BaseEntity {
  name: string;
  balance: number;
  initialBalance: number;
  isDefault: boolean;
  type: AccountType;
  color: string;
}
