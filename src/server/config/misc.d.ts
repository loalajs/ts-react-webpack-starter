export interface KeyValuePair<T = any> {
  [key: string]: T;
}

declare function require(name:string): any;
