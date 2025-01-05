import { BaseModel } from './_base.model';

export interface Entry extends BaseModel {
  amount: number;
  description: string;

  type: string;

  category: string;
}
