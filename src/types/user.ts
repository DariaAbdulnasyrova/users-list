import { AllStrings } from "./utils";

export enum Country {
  USA = "USA",
  UK = "UK",
  Germany = "Germany",
  France = "France",
  Italy = "Italy",
  Spain = "Spain",
  Canada = "Canada",
  Australia = "Australia",
  Japan = "Japan",
  Ireland = "Ireland",
}

export type UserBase = {
  country: Country;
  firstName: string;
  lastName: string;
  age: number;
};

export type User = UserBase & {
  id: string;
};

export type NewUser = UserBase;
export type UpdateUser = Partial<UserBase>;

export type UserFormData = AllStrings<NewUser>;
