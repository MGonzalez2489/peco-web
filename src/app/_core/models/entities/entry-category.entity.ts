import { BaseEntity } from './_base.entity';

export interface EntryCategory extends BaseEntity {
  name: string;
  parentId?: number;
  subCategories: EntryCategory[];
  isVisible: boolean;
  isDefault: boolean;
}
