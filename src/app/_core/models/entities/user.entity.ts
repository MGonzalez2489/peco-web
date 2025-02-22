import { BaseEntity } from './_base.entity';

export interface User extends BaseEntity {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}
