import WelcomePage from "./page";
import Header from "@/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("WelcomePage Component", () => {
  it("renders correctly", () => {
    render(<WelcomePage />);
    expect(screen.getByText("Welcome to Calendar App")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your routine effectively")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Access Calendar" })
    ).toHaveAttribute("href", "/calendar");
  });
});
