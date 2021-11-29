import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import elasticData from "./__tests__/sampleElasticData.json";

const server = setupServer(
  rest.get("/api/elastic/search", (req, res, ctx) => {
    return res(ctx.json(elasticData));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const AllTheProviders: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
