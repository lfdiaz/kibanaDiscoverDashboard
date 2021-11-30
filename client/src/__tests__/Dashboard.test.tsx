import "@testing-library/jest-dom";
import React from "react";
import Dashboard from "../features/Dashboard/Dashboard";
import moment from "moment";
import { render } from "../test-utils";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Load table and graph on initial load", async () => {
  render(<Dashboard />);
  expect(screen.getByTestId("dashboard-table-body")).toBeInTheDocument();
  expect(screen.getByTestId("dashboard-bar-chart")).toBeInTheDocument();
  // We must wait for data to load before searching for the bar chart
  // await waitFor(() => {
  //   expect(screen.getByText("timestamp per hour")).toBeInTheDocument();
  // });
});

test("Load table and graph after date selection", async () => {
  render(<Dashboard />);
  expect(screen.getByTestId("input-date-picker-dashboard")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("input-date-picker-dashboard"));

  // Ensure element appear on the screen before firing an avent
  const fromPicker = await within(
    screen.getByTestId("date-time-picker-from-graph")
  ).getByRole("textbox");
  const toPicker = await within(
    screen.getByTestId("date-time-picker-to-graph")
  ).getByRole("textbox");

  expect(fromPicker).toBeInTheDocument();

  expect(toPicker).toBeInTheDocument();

  fireEvent.change(toPicker, {
    target: { value: moment().add(4, "days") },
  });
  fireEvent.change(fromPicker, {
    target: { value: moment().subtract(4, "days") },
  });
});
