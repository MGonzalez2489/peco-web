import { BaseModel } from './_base.model';

export interface EntryCategory extends BaseModel {
  name: string;
  parentId?: number;
  subCategories: EntryCategory[];
}
