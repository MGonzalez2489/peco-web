export interface BaseCatalog {
  publicId: string;
}

export interface BaseModel extends BaseCatalog {
  createdAt: string;
  updatedAt: string;
}
