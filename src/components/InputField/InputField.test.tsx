import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

it("renders label and placeholder", () => {
  render(<InputField label="Email" placeholder="you@example.com" />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
});

it("clear button clears value", () => {
  const onChange = vi.fn();
  render(<InputField label="Name" value="John" onChange={onChange} clearable />);
  fireEvent.click(screen.getByRole("button", { name: /clear input/i }));
  expect(onChange).toHaveBeenCalled();
});
