// src/services/apiService.tsx

import axios from 'axios';
import { CreateDinner, Dinner, CreateDinnerPlanRequest, DinnerPlan } from '../types/interfaces';


const API_BASE_URL = 'https://matpirat-dsgpfqc9fbhnf2hq.northeurope-01.azurewebsites.net';

const apiService = {

  getDinners: async (): Promise<Dinner[]> => {
    const response = await axios.get<Dinner[]>(`${API_BASE_URL}/Dinner/GetDinners`)
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
      return response.data;
    },

  getDinnerById: async (id: string): Promise<Dinner> => {
    const response = await axios.post(`${API_BASE_URL}/Dinner/GetDinner?id=${id}`)
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;
  },

  addDinner: async (dinner: CreateDinner) => {
    const { name, description, type, meatType, skillLevel, ingredients, tags, imageData } = dinner;
    const response = await axios.post(`${API_BASE_URL}/Dinner/AddDinner`, { 
      name, 
      description, 
      type, 
      meatType, 
      skillLevel, 
      ingredients, 
      tags, 
      imageData
     } ) 
        .catch( function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;
  },

  updateDinner: async (dinner: Dinner) => {
    const { id, name, description, type, meatType, skillLevel, ingredients, tags, imageData } = dinner;
    console.log(dinner);
    const response = await axios.post(`${API_BASE_URL}/Dinner/EditDinner`, { 
      id,
      name,
      description,
      type,
      meatType,
      skillLevel,
      ingredients,
      tags,
      imageData
     })
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;    
  },

  deleteDinner: async (id: string) => {
    const response = await axios.post(`${API_BASE_URL}/Dinner/DeleteDinner?id=${id}`)
        .catch (function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
        return response.data;
  },

  planDinners: async (dinnerPlanRequest: CreateDinnerPlanRequest): Promise<DinnerPlan> => {
    const response = await axios.post(`${API_BASE_URL}/DinnerPlan/PlanDinners`, { dinnerPlanRequest })
    .catch (function (error) {
      throw error.response ? error.response.data : new Error(`Network error`);
  });
  return response.data;
}

};

export default apiService;