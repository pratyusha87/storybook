import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] }
  }
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    variant: "outlined",
    size: "md",
    helperText: "We'll never share your email.",
    clearable: true
  }
};

export const Invalid: Story = {
  args: {
    label: "Username",
    placeholder: "min 3 characters",
    invalid: true,
    errorMessage: "Too short"
  }
};

export const Loading: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search",
    loading: true
  }
};

export const FilledLarge: Story = {
  args: {
    label: "Full name",
    placeholder: "John Doe",
    variant: "filled",
    size: "lg"
  }
};

export const PasswordWithToggle: Story = {
  render: () => {
    const Demo = () => {
      const [val, setVal] = useState("");
      return (
        <InputField
          label="Password"
          type="password"
          passwordToggle
          clearable
          value={val}
          onChange={(e) => setVal(e.target.value)}
          helperText="Use 8+ characters"
        />
      );
    };
    return <Demo />;
  }
};
