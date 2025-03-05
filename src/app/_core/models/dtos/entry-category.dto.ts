export interface EntryCategoryUpdateDto {
  name: string;
  isVisible: boolean;
}

export interface EntryCategoryCreateDto {
  name: string;
  parentId?: string;
}
