import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type ValidationRule = (value: string | number) => string | null;
type ValidationRules<T> = Partial<Record<keyof T, ValidationRule>>;

export function useForm<T extends Record<string, string | number>>(
  formData: T
) {
  const [values, setValues] = useState(formData);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validate = (rules: ValidationRules<T>) => {
    const newErrors: Errors<T> = {};

    for (const key in rules) {
      const rule = rules[key];

      if (rule) {
        const error = rule(values[key]);

        if (error) newErrors[key] = error;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const register = (name: keyof T, rules: ValidationRules<T>[keyof T]) => ({
    name,
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;

      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (rules && touched[name]) {
        const error = rules(value);

        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
      }
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (rules) {
        const error = rules(values[name]);

        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
      }
    },
  });

  const handleSubmit = (
    rules: ValidationRules<T>,
    onSubmit: (data: T) => void
  ) => {
    const isValid = validate(rules);

    if (isValid) {
      onSubmit(values);
      setSubmitted(true);
    }
  };

  const isValid = Object.values(errors).every((value) => !value);

  return {
    values,
    errors,
    register,
    handleSubmit,
    isValid,
    submitted,
  };
}
