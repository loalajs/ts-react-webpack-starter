import { AppError } from './index';
import { KeyValuePair } from '../../config/misc';

export interface FieldValidationError {
  rule: string;
  message: string;
}

export class HttpForbiddenError extends AppError {
  constructor (message: string, status?: number) {
    super(message);
    this.status = status || 403;
  }
}

export class HttpAuthError extends AppError {
  constructor (message: string, status?: number) {
    super(message);
    this.status = status || 401;
  }
}

export class HttpNotFound extends AppError {
  constructor(message: string, status?: number) {
    super(message);
    this.status =  status || 404;
  }
}

export class FormValidationError extends AppError {
  readonly fields: KeyValuePair<FieldValidationError[]>;
  constructor(fields: KeyValuePair<FieldValidationError[]>, status?: number) {
    super();
    this.fields = fields;
    this.status = status || 400;
  }
}

export class ServiceError extends AppError {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 503;
  }
}

