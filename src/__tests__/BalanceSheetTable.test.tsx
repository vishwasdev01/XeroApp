import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { getBalanceSheet } from "../services/api";
import BalanceSheetTable from "../components/BalanceSheetTable";

jest.mock("../services/api");

describe("BalanceSheetTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render table headers correctly", async () => {
    (getBalanceSheet as jest.Mock).mockResolvedValue({
      Reports: [
        {
          Rows: [],
          ReportName: "Balance Sheet",
          ReportTitles: ["Title1", "Title2", "Equity"],
        },
      ],
    });

    render(<BalanceSheetTable />);

    await waitFor(() =>
      expect(screen.getByRole("table")).toBeInTheDocument()
    );

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Equity")).toBeInTheDocument();
  });

  it("should render rows when data is fetched", async () => {
    (getBalanceSheet as jest.Mock).mockResolvedValue({
      Reports: [
        {
          Rows: [
            {
              RowType: "Section",
              Title: "Assets",
              Rows: [
                {
                  RowType: "Row",
                  Cells: [
                    { Value: "Cash" },
                    { Value: "1000" },
                    { Value: "2000" },
                  ],
                },
              ],
            },
          ],
          ReportName: "Balance Sheet",
          ReportTitles: ["Title1", "Title2", "Equity"],
        },
      ],
    });

    render(<BalanceSheetTable />);

    await waitFor(() =>
      expect(screen.getByText("Assets")).toBeInTheDocument()
    );

    expect(screen.getByText("Cash")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
  });

  it("should display an error when data fetching fails", async () => {
    (getBalanceSheet as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<BalanceSheetTable />);

    await waitFor(() =>
      expect(screen.queryByRole("table")).not.toBeInTheDocument()
    );
  });
});
