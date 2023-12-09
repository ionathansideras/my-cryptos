// Import the axios library for making HTTP requests
import axios from "axios";

// Retrieve API keys from environment variables using Vite's import.meta.env
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const secretApiKey = import.meta.env.VITE_REACT_APP_SECRET_API_KEY;

// Function to fetch data from the Quantify Crypto API using provided API keys
export async function coinDetailsApi(symbol) {
  try {
    // Make a GET request to the Quantify Crypto API endpoint
    const response = await axios.get(
      `https://quantifycrypto.com/api/v1/coins/${symbol}`,
      {
        // Set custom headers with API keys for authentication
        headers: {
          "QC-Access-Key": apiKey,
          "QC-Secret-Key": secretApiKey,
        },
      }
    );

    // Return the data from the API response
    return response.data.data;
  } catch (error) {
    // Handle errors that may occur during the API request
    console.error("Error fetching data:", error.message);
    throw error; // Optionally re-throw the error for the caller to handle
  }
}
