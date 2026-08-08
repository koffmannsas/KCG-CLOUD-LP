import { ValueObject } from './ValueObject';

export interface IdentifierProps {
  value: string;
}

export class Identifier extends ValueObject<IdentifierProps> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
