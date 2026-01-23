// src/pages/CreateDinnerPlan.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DinnerService from "../services/DinnerService";
import { CreateDinnerPlanRequest, DinnerPlan } from "../types/interfaces";
import styles from "./CreateDinnerPlan.module.css";

const CreateDinnerPlanPage: React.FC = () => {
  // State to store form data
  const [formData, setFormData] = useState<CreateDinnerPlanRequest>({
    tacoFriday: false,
    startDay: 1, // Default to Monday
    numberOfDays: 7,
    numberOfFish: 1,
  });

  const navigate = useNavigate();

  // State to store the result of the DinnerPlan
  const [dinnerPlan, setDinnerPlan] = useState<DinnerPlan | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const newValue =
      type === "checkbox"
        ? (checked as boolean)
        : name === "startDay"
          ? Number(value)
          : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await DinnerService.planDinners(formData);
      // Redirect to the DinnerPlanPage with the dinner plan data

      navigate("/DinnerPlan", { state: result });
    } catch (error) {
      console.error("Error creating dinner plan:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Fyr inn noe her så blir det bra</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.checkboxGroup}>
          <label htmlFor="tacoFriday">Taco Fredag?</label>
          <input
            type="checkbox"
            id="tacoFriday"
            name="tacoFriday"
            checked={formData.tacoFriday}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDay">Velg dag planen skal starte på:</label>
          <select
            name="startDay"
            id="startDay"
            value={formData.startDay}
            onChange={handleChange}
          >
            <option value={0}>Søndag</option>
            <option value={1}>Mandag</option>
            <option value={2}>Tirsdag</option>
            <option value={3}>Onsdag</option>
            <option value={4}>Torsdag</option>
            <option value={5}>Fredag</option>
            <option value={6}>Lørdag</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numberOfDays">Hvor lenge skal planen vare?</label>
          <input
            className={styles.numberInput}
            type="number"
            id="numberOfDays"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            min="1"
          />
          <p className={styles.helperText}>
            Antall dager planen skal gjelde for
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numberOfFish">Btw, how much is the fish?</label>
          <input
            className={styles.numberInput}
            type="number"
            id="numberOfFish"
            name="numberOfFish"
            value={formData.numberOfFish}
            onChange={handleChange}
            min="0"
          />
          <p className={styles.helperText}>Antall fiskemåltider i uken</p>
        </div>

        <button type="submit" className={styles.submitButton}>
          Plan Dinners
        </button>
      </form>
    </div>
  );
};

export default CreateDinnerPlanPage;
