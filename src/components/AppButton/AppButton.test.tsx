import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AppButton from "./AppButton";
import "@testing-library/jest-dom";

describe("AppButton", () => {
  test("should render AppButton with an 'submit' text", () => {
    render(<AppButton text="Submit" />);
    const linkElement = screen.getByText("Submit");
    expect(linkElement).toBeInTheDocument();
  });
});
