import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Card from "./components/Card.jsx";

test("Render recipe title", () => {
  const array = ["Score"];
  const component = render(<Card title={array} />);
  expect(component.container).toHaveTextContent("Score");
});
test("Render type of diet", () => {
  const array = ["Type of Diet"];
  const component = render(<Card arrayDiets={array} />);
  expect(component.container).toHaveTextContent("Type of Diet");
});
