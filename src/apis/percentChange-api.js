import axios from "axios";
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const secretApiKey = import.meta.env.VITE_REACT_APP_SECRET_API_KEY;

export async function percentChangeApi() {
  const response = await axios.get(
    "https://quantifycrypto.com/api/v1/coins/percent-change?rank_to=04",
    {
      headers: {
        "QC-Access-Key": apiKey,
        "QC-Secret-Key": secretApiKey,
      },
    }
  );
  return response.data.data;
}
