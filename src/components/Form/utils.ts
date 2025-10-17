export const validationRules = {
  firstName: (value: string) => (!value ? "First name is required" : null),
  lastName: (value: string) => (!value ? "Last name is required" : null),
  age: (value: string) => {
    if (!value) {
      return "Age is required";
    } else if (Number(value) <= 0 || Number(value) > 100)
      return "Age must be greater than 0 and less than 100";
  },
  country: (value: string) => (!value ? "Please select a country" : null),
};
