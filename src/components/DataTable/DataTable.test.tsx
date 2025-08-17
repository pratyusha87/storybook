import { render, screen, fireEvent, within } from "@testing-library/react";
import { DataTable, Column } from "./DataTable";

type Row = { id: number; name: string; age: number };
const data: Row[] = [
  { id: 1, name: "B", age: 30 },
  { id: 2, name: "A", age: 20 }
];
const columns: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

it("sorts by clicking header", () => {
  render(<DataTable<Row> data={data} columns={columns} />);
  const nameHeader = screen.getByRole("button", { name: /name/i });
  fireEvent.click(nameHeader);
  const rows = screen.getAllByRole("row");
  const firstDataRow = within(rows[1]).getAllByRole("cell")[0];
  expect(firstDataRow).toHaveTextContent("A");
});
