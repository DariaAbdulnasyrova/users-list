import { ValidationRules } from "@/hooks/useForm";
import { Country, UserFormData } from "@/types/user";

const MIN_AGE = {
  [Country.UK]: 25,
  [Country.Ireland]: 25,
  [Country.USA]: 21,
  default: 18,
};

const required =
  (message: string = "This field is required") =>
  (value: string) =>
    value.trim() === "" ? message : null;

const minLength =
  (length: number = 3) =>
  (value: string) =>
    value.trim().length < length ? `Minimum ${length} characters` : null;

const maxLength =
  (length: number = 20) =>
  (value: string) =>
    value.trim().length > length ? `Maximum ${length} characters` : null;

const maxAge =
  (max: number = 100) =>
  (value: string) =>
    Number(value.trim()) > max ? `Age must be less than ${max}` : null;

const minAgeByCountry = (value: string, values: UserFormData) => {
  const min = MIN_AGE[values.country] || MIN_AGE.default;

  return Number(value.trim()) < min ? `Minimal age is ${min}` : null;
};

export const validationRules: ValidationRules<UserFormData> = {
  firstName: [required("First name is required"), minLength(), maxLength()],
  lastName: [required("Last name is required"), minLength(), maxLength()],
  age: [required("Age is required"), maxAge(), minAgeByCountry],
  country: [required("Please select a country")],
};
