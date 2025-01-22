export interface BaseCatalog {
  publicId: string;
}
export interface BaseEntity extends BaseCatalog {
  createdAt: string;
  updatedAt: string;
}
