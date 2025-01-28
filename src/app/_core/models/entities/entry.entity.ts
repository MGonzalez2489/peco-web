import { BaseCatalog, BaseEntity } from './_base.entity';

export interface Entry extends BaseEntity {
  description: string;
  amount: number;
}

// export interface EntryType extends BaseCatalog{
//
// }
