import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke Test
it("renders the component without crashing", () => {
  render(<Card />);
});

// Snapshot Test
it("matches the snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
