import { BaseEntity } from './_base.entity';

export interface Entry extends BaseEntity {
  description: string;
  amount: number;
  category: string;
  type: string;
  account: string;
  status: string;
}
