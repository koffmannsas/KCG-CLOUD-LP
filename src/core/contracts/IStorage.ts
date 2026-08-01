import { IService } from './IService';

export enum StorageType {
  LOCAL,
  SESSION,
  CLOUD,
  BLOB
}

export interface IStorage extends IService {
  set(key: string, value: any, type?: StorageType): void;
  get<T>(key: string, type?: StorageType): T | null;
}
