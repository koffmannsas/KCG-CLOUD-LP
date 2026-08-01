export interface IRestAdapter {
  get(path: string): Promise<any>;
  post(path: string, body: any): Promise<any>;
}

export interface IGraphQLAdapter {
  query(query: string, variables?: any): Promise<any>;
  mutate(mutation: string, variables?: any): Promise<any>;
}
