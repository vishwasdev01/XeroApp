import axios from "axios";
import { getBalanceSheet } from "../services/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getBalanceSheet API Service", () => {
  it("should fetch balance sheet data successfully", async () => {
    const mockData = {
      Reports: [{ Rows: [], ReportName: "Balance Sheet", ReportTitles: [] }],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getBalanceSheet();
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/balance-sheet"
    );
  });

  it("should throw an error when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getBalanceSheet()).rejects.toThrow("Failed to fetch Balance Sheet data");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/balance-sheet"
    );
  });
});
