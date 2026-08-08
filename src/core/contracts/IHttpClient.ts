import { IService } from './IService';

export interface IHttpClient extends IService {
  setBaseURL(url: string): void;
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: any): Promise<T>;
}
