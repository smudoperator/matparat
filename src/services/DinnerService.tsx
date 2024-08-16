// src/services/apiService.tsx

import axios from 'axios';

const API_BASE_URL = 'https://matpirat-dsgpfqc9fbhnf2hq.northeurope-01.azurewebsites.net';

interface Dinner {
    // Fix this so that it actually matches dinners2 repo model
    id: number;
    name: string;
    type: string;
    // add more stuffers here :^)
  }

const apiService = {

  getDinners: async (): Promise<Dinner[]> => {
    const response = await axios.get<Dinner[]>(`${API_BASE_URL}/Dinner/GetDinners`)
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
      return response.data;
    },

  getDinnerById: async (id) => {
    const response = await axios.post(`${API_BASE_URL}/Dinner/GetDinner`, { id })
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;
  },

  addDinner: async (body) => {
    const response = await axios.post(`${API_BASE_URL}/Dinner/AddDinner`, { body } ) 
        .catch( function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;
  },

  updateDinner: async (body) => {
    console.log(body);
    const response = await axios.post(`${API_BASE_URL}/Dinner/EditDinner`, { body })
        .catch(function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
    return response.data;    
  },

  deleteDinner: async (id) => {
    const response = await axios.post(`${API_BASE_URL}/Dinner/DeleteDinner`, { id })
        .catch (function (error) {
            throw error.response ? error.response.data : new Error(`Network error`);
        });
        return response.data;
  }

};

export default apiService;