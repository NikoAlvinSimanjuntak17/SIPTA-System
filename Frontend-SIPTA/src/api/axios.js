import axios from 'axios';
import Cookies from 'js-cookie';

// Ensure CSRF token is sent with requests
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Create a new instance of Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// Function to fetch CSRF token
export const fetchCsrfToken = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    throw error;
  }
};

// Function to fetch procurements
export const fetchProcurements = async () => {
  await fetchCsrfToken();  // Ensure CSRF token is fetched first
  try {
    const response = await apiClient.get('/procurements');
    return response;
  } catch (error) {
    console.error("Failed to fetch procurements:", error);
    throw error;
  }
};

// Function to fetch categories by procurementName
export const fetchCategoriesByProcurement = async (procurementName) => {
  await fetchCsrfToken(); // Ensure CSRF token is fetched first
  try {
    const response = await apiClient.get(`/categories/by-procurement-name/${procurementName}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchSubCategoriesByCategory = async (categoryName) => {
  await fetchCsrfToken(); // Ensure CSRF token is fetched first
  try {
    const response = await apiClient.get(`/subcategories/by-category-name/${categoryName}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch sub categories:", error);
    throw error;
  }
};

export default apiClient;
