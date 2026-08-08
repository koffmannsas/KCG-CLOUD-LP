import { IService } from '../types/base.types';

export class HttpClient implements IService {
  name: string = 'HttpClient';
  version: string = '1.0.0';

  private baseURL: string = '';

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public setBaseURL(url: string): void {
    this.baseURL = url;
  }

  public async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`);
    if (!response.ok) {
      throw new Error(`HTTP GET failed: ${response.statusText}`);
    }
    return response.json();
  }

  public async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP POST failed: ${response.statusText}`);
    }
    return response.json();
  }
}
