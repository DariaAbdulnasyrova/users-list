import React, { FormEvent } from "react";
import { Country, User, UserFormData } from "@/types/user";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "./validation";
import styles from "./Form.module.css";

type FormProps = {
  formData?: User;
  onSubmit: (formData: UserFormData) => void;
  onCancel: () => void;
};

export default function Form({ formData, onSubmit, onCancel }: FormProps) {
  const initialFormData: UserFormData = {
    firstName: formData?.firstName ?? "",
    lastName: formData?.lastName ?? "",
    age: formData?.age?.toString() ?? "",
    country: formData?.country ?? "",
  };

  const { errors, register, handleSubmit, isValid } = useForm<UserFormData>(
    initialFormData,
    validationRules
  );

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit(onSubmit);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.input}>
        <label htmlFor="country-input">Country</label>
        <select id="country-input" {...register("country", ["age"])}>
          <option value="">Select country</option>
          {Object.values(Country).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div
          className={`${styles.error} ${errors.country ? styles.visible : ""}`}
        >
          {errors.country}
        </div>
      </div>
      <div className={styles.input}>
        <label htmlFor="first-name-input">First name</label>
        <input id="first-name-input" type="text" {...register("firstName")} />
        <div
          className={`${styles.error} ${errors.firstName ? styles.visible : ""}`}
        >
          {errors.firstName}
        </div>
      </div>
      <div className={styles.input}>
        <label htmlFor="last-name-input">Last name</label>
        <input id="last-name-input" type="text" {...register("lastName")} />
        <div
          className={`${styles.error} ${errors.lastName ? styles.visible : ""}`}
        >
          {errors.lastName}
        </div>
      </div>
      <div className={styles.input}>
        <label htmlFor="age-input">Age</label>
        <input
          id="age-input"
          type="number"
          min="0"
          max="100"
          {...register("age")}
        />
        <div className={`${styles.error} ${errors.age ? styles.visible : ""}`}>
          {errors.age}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.saveButton} type="submit" disabled={!isValid}>
          Save
        </button>
      </div>
    </form>
  );
}
