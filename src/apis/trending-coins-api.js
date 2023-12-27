// Import the axios library for making HTTP requests
import axios from "axios";

// Function to fetch data from the Quantify Crypto API using provided API keys
export async function trendingCoinsApi() {
  try {
    // Make a GET request to the Quantify Crypto API endpoint
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/search/trending'
    );
    // Return the data from the API response
    return response.data.coins;
  } catch (error) {
    // Handle errors that may occur during the API request
    console.error("Error fetching data:", error.message);
    throw error; // Optionally re-throw the error for the caller to handle
  }
}
