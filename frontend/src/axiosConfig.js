import axios from 'axios';

// Define axios api backend server
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});
export default api;