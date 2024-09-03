// src/pages/CreateDinnerPlan.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DinnerService from '../services/DinnerService'; // Adjust the path as necessary
import { CreateDinnerPlanRequest, DinnerPlan } from '../types/interfaces';

const CreateDinnerPlanPage: React.FC = () => {
  // State to store form data
  const [formData, setFormData] = useState<CreateDinnerPlanRequest>({
    tacoFriday: false,
    startDay: 1, // Default to Monday
    numberOfDays: 7,
    numberOfFish: 2
  });

  const navigate = useNavigate();

  // State to store the result of the DinnerPlan
  const [dinnerPlan, setDinnerPlan] = useState<DinnerPlan | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    // If the event target is a checkbox, checked will be available; otherwise, it will be undefined.
    const newValue = type === 'checkbox' ? (checked as boolean) : (value as unknown as string | number);
  
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await DinnerService.planDinners(formData);
      // Redirect to the DinnerPlanPage with the dinner plan data

      // console.log("DinnerPlan result:", result); // Debug log

      navigate('/DinnerPlan', { state: result });
    } catch (error) {
      console.error('Error creating dinner plan:', error);
    }
  };

  return (
    <div>
      <h1>Plan Your Dinner Week</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Taco Friday:
          <input
            type="checkbox"
            name="tacoFriday"
            checked={formData.tacoFriday}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Day:
          <select name="startDay" value={formData.startDay} onChange={handleChange}>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </label>
        <label>
          Number of Days:
          <input
            type="number"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Number of Fish Dinners:
          <input
            type="number"
            name="numberOfFish"
            value={formData.numberOfFish}
            onChange={handleChange}
            min="0"
          />
        </label>
        <button type="submit">Plan Dinners</button>
      </form>
    </div>
  );
};

export default CreateDinnerPlanPage;