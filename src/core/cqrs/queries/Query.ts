export interface IQuery<TResult> {
  // Marker interface
}

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
  execute(query: TQuery): Promise<TResult>;
}

export interface IQueryBus {
  execute<TResult>(query: IQuery<TResult>): Promise<TResult>;
}
