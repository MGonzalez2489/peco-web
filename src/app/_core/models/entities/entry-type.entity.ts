import { BaseEntity } from './_base.entity';

export interface EntryType extends BaseEntity {
  name: string;
  displayName: string;
  color: string;
}
