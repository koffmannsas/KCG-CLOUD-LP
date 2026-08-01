export interface ICommand {
  // Marker interface
}

export interface ICommandHandler<TCommand extends ICommand, TResult = void> {
  execute(command: TCommand): Promise<TResult>;
}

export interface ICommandBus {
  execute<TResult>(command: ICommand): Promise<TResult>;
}
