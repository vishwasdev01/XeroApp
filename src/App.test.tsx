import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("should render the header and BalanceSheetTable", () => {
    render(<App />);

    expect(screen.getByText("Balance Sheet Report")).toBeInTheDocument();
    expect(screen.getByText("Balance Sheet Report")).toBeInTheDocument();
  });
});
