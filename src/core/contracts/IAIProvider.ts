export interface IAIProvider {
  id: string;
  generate(prompt: string, context?: any): Promise<string>;
}
