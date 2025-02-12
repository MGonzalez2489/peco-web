import { BaseEntity } from './_base.entity';

export interface AccountType extends BaseEntity {
  name: string;
  displayName: string;
}
