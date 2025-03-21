import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import App from "../App";
import { describe, it, expect } from "vitest"; // Import test

describe("App Component", () => {
  it("renders the App component", () => {
    render(
      <MemoryRouter> 
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Enigma Laundry/i)).toBeInTheDocument();
  });
});
