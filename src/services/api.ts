import axios from "axios";

// const BASE_URL = "	https://api.xero.com/api.xro/2.0";
const BASE_URL = "http://localhost:3000"; 

export const getBalanceSheet = async () => {
    try {
        // const response = await axios.get(`http://localhost:3000/api.xro/2.0/Reports/BalanceSheet`);
        // const response = await axios.get(`http://localhost:3000/api.xro/2.0/Reports/BalanceSheet`);
        const response = await axios.get(`http://localhost:4000/api/balance-sheet`);
        return response.data;
    } catch (error) {
        console.error("Error fetching balance sheet:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios error details:", error.response?.data);
        }
        throw new Error("Failed to fetch Balance Sheet data");
    }
};
