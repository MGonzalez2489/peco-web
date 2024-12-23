import { BaseModel } from './_base.model';

export interface Account extends BaseModel {
  name: string;
  balance: number;

  isDefault: boolean;
}
