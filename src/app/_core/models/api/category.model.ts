import { BaseModel } from './_base.model';

export interface Category extends BaseModel {
  name: string;
  subCategories: Category[];
}
