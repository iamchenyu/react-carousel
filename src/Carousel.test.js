import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke Test
it("renders the component", () => {
  render(<Carousel />);
});

// Snapshot Test
it("matches the snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

// Specialized Testing
it("works when you click on the right and left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("hides the arrows when exhausting the array", () => {
  const { queryByTestId } = render(<Carousel />);

  let leftArrow = queryByTestId("left-arrow");
  let rightArrow = queryByTestId("right-arrow");

  // hide the left arrow for the 1st image
  // Option 1
  // expect(leftArrow).not.toBeTruthy();
  // Option 2
  expect(leftArrow).toBeNull();
  expect(rightArrow).toBeInTheDocument();

  // move to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  leftArrow = queryByTestId("left-arrow");
  rightArrow = queryByTestId("right-arrow");

  // hide the right arrow for the 3rd image
  // expect(rightArrow).not.toBeTruthy();
  expect(rightArrow).toBeNull();
  expect(leftArrow).toBeInTheDocument();
});
