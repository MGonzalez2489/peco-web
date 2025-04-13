import { BaseEntity } from './_base.entity';
import { EntryCategory } from './entry-category.entity';

export interface Entry extends BaseEntity {
  description: string;
  amount: number;
  category: EntryCategory;
  type: string;
  account: string;
  status: string;
}
