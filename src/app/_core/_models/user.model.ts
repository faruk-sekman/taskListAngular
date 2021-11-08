import { RoleModel } from "./role.model";

export interface UserModel {
  id: number;
  password?: string;
  firstName: string;
  lastName: string;
  username: string;
  role: RoleModel;
  token?: string;
}
