import { IService } from '../types/base.types';

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserContext {
  userId: string;
  roles: Role[];
}

export class PermissionEngine implements IService {
  name: string = 'PermissionEngine';
  version: string = '1.0.0';

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public hasPermission(user: UserContext, requiredPermission: string): boolean {
    return user.roles.some(role => role.permissions.includes(requiredPermission) || role.permissions.includes('*'));
  }

  public hasAnyPermission(user: UserContext, requiredPermissions: string[]): boolean {
    return requiredPermissions.some(permission => this.hasPermission(user, permission));
  }

  public hasAllPermissions(user: UserContext, requiredPermissions: string[]): boolean {
    return requiredPermissions.every(permission => this.hasPermission(user, permission));
  }
}
