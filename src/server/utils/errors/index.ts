import { FieldValidationError } from './customError';
import { KeyValuePair } from '../../config/misc';

export interface AppErrorInterface {
  status: number;
  name: string;
  message?: string;
  fields?: KeyValuePair<FieldValidationError[]>;
}

export class AppError extends Error {
  status: number;
  name: string;
  constructor (message?: string, status?: number) {

    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Default error status: Server Error
    this.status = status || 500;

  }
}
