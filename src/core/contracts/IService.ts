export interface IService {
  name: string;
  version: string;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}
