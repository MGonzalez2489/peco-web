import { BaseEntity } from './_base.entity';

export interface Account extends BaseEntity {
  name: string;
  balance: number;
  initialBalance: number;
  isDefault: boolean;
}
