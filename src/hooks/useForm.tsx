import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type ValidationRule<T> = (value: string, values: T) => string | null;
export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<T>[]>>;

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validationRules: ValidationRules<T>,
  hasBeenSubmitted: boolean
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState<boolean>(hasBeenSubmitted);

  const validate = (
    fields: (keyof T)[] = Object.keys(validationRules),
    currentValues: T = values
  ) => {
    const newErrors: Errors<T> = { ...errors };

    for (const key of fields) {
      const validators = validationRules[key] || [];

      for (const validator of validators) {
        newErrors[key] = validator(currentValues[key], currentValues);

        if (newErrors[key]) {
          break;
        }
      }
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => !value);
  };

  const register = (name: keyof T, dependent: (keyof T)[] = []) => ({
    name,
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;

      setValues((prev) => {
        const newValues = { ...prev, [name]: value };

        const fieldsToValidate = [...dependent, name].filter(
          (field) => submitted || touched[field]
        );

        validate(fieldsToValidate, newValues);

        return newValues;
      });
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validate([name]);
    },
  });

  const isValid = Object.values(errors).every((value) => !value);

  const handleSubmit = (onSubmit: (data: T) => void) => {
    setSubmitted(true);

    if (validate()) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    register,
    handleSubmit,
    isValid,
    submitted,
  };
}
