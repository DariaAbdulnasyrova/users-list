import { Country, NewUser, UserFormData } from "@/types/user";

export function normalizeUserData(data: UserFormData): NewUser {
  return {
    ...data,
    age: Number(data.age),
    country: data.country as Country
  };
}