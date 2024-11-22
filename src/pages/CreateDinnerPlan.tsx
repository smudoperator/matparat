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
    numberOfFish: 1
  });

  const navigate = useNavigate();

  // State to store the result of the DinnerPlan
  const [dinnerPlan, setDinnerPlan] = useState<DinnerPlan | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    const newValue = type === 'checkbox' ? (checked as boolean)
                    : name === 'startDay' ? Number(value) 
                    : value; 
  
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

      navigate('/DinnerPlan', { state: result });
    } catch (error) {
      console.error('Error creating dinner plan:', error);
    }
  };

  return (
    <div className="container">
      <h1>Fyr inn noe her så blir det bra</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Taco Fredag?:
          <input className="form-checkbox"
            type="checkbox"
            name="tacoFriday"
            checked={formData.tacoFriday}
            onChange={handleChange}
          />
        </label>
        <div className="form-group">
        <label>
          Velg dag planen skal starte på:
          <select name="startDay" value={formData.startDay} onChange={handleChange}>
            <option value={0}>Søndag</option>
            <option value={1}>Mandag</option>
            <option value={2}>Tirsdag</option>
            <option value={3}>Onsdag</option>
            <option value={4}>Torsdag</option>
            <option value={5}>Fredag</option>
            <option value={6}>Lørdag</option>
          </select>
        </label>
        </div>
        
        <label>
          Hvor lenge skal planen vare?
          <input className="form-input"
            type="number"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Btw, how much is the fish?
          <input className="form-input"
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