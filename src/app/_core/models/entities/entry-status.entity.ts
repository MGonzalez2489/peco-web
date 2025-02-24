import { BaseEntity } from './_base.entity';

export interface EntryStatus extends BaseEntity {
  name: string;
  displayName: string;
}
