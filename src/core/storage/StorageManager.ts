import { IService } from '../types/base.types';

export enum StorageType {
  LOCAL,
  SESSION,
  CLOUD,
  BLOB
}

export class StorageManager implements IService {
  name: string = 'StorageManager';
  version: string = '1.0.0';

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public set(key: string, value: any, type: StorageType = StorageType.LOCAL): void {
    if (typeof window !== 'undefined' && type === StorageType.LOCAL) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public get<T>(key: string, type: StorageType = StorageType.LOCAL): T | null {
    if (typeof window !== 'undefined' && type === StorageType.LOCAL) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
}
