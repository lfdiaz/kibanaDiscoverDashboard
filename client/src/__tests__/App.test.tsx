import React from "react";
import { render } from "../test-utils";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";

test("renders learn react link", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("dashboard-table-body")).toBeInTheDocument();
});
