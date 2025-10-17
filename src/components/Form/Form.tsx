import React, { FormEvent } from "react";
import { Country, User, UserFormData } from "@/types/user";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "./utils";
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

  const { errors, register, handleSubmit, submitted, isValid } =
    useForm<UserFormData>(initialFormData);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit(validationRules, onSubmit);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div
        className={`${styles.input} ${errors.country ? styles.inputError : ""}`}
      >
        <label htmlFor="country-input">Country</label>
        <select
          id="country-input"
          {...register("country", validationRules.country)}
        >
          <option value="">Select country</option>
          {Object.values(Country).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.input}>
        <label htmlFor="first-name-input">First name</label>
        <input
          id="first-name-input"
          type="text"
          required
          disabled={submitted}
          {...register("firstName", validationRules.firstName)}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="last-name-input">Last name</label>
        <input
          id="last-name-input"
          type="text"
          required
          disabled={submitted}
          {...register("lastName", validationRules.lastName)}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="age-input">Age</label>
        <input
          id="age-input"
          type="number"
          min="0"
          max="100"
          required
          disabled={submitted}
          {...register("age", validationRules.age)}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          type="button"
          disabled={submitted}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={styles.saveButton}
          type="submit"
          disabled={!isValid || submitted}
        >
          Save
        </button>
      </div>
    </form>
  );
}
