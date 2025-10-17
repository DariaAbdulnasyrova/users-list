export type AllStrings<T> = {
  [K in keyof T]: string;
};
