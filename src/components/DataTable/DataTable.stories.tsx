import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable, Column } from "./DataTable";

type User = { id: number; name: string; email: string; age: number };

const data: User[] = [
  { id: 1, name: "Aarav Gupta", email: "aarav@example.com", age: 24 },
  { id: 2, name: "Diya Sharma", email: "diya@example.com", age: 22 },
  { id: 3, name: "Kabir Singh", email: "kabir@example.com", age: 28 },
  { id: 4, name: "Meera Iyer", email: "meera@example.com", age: 26 }
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"]
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = {
  args: { data, columns, selectable: true }
};

export const Empty: Story = {
  args: { data: [], columns }
};

export const Loading: Story = {
  args: { data: [], columns, loading: true }
};

export const WithSelectionCallback: Story = {
  render: (args) => {
    const Demo = () => {
      const [selected, setSelected] = useState<User[]>([]);
      return (
        <div className="space-y-3">
          <DataTable<User> {...args} onRowSelect={setSelected} />
          <div className="text-sm opacity-80">
            Selected: {selected.map(s => s.name).join(", ") || "none"}
          </div>
        </div>
      );
    };
    return <Demo />;
  },
  args: { data, columns, selectable: true }
};
