import { IKernel } from '../contracts/IKernel';
import { ILogger } from '../contracts/ILogger';
import { IStorage } from '../contracts/IStorage';
import { IHttpClient } from '../contracts/IHttpClient';

export class KCGSdk {
  private kernel: IKernel;

  constructor(kernel: IKernel) {
    this.kernel = kernel;
  }

  // Gateway to hide framework complexity for internal applications
  // e.g. getLogger(), getStorage()
  public getStatus() {
    return this.kernel.getStatus();
  }
}
