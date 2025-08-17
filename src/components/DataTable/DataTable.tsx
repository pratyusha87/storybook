import React, { useEffect, useMemo, useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

type SortState<T> = {
  key: keyof T | null;
  direction: "asc" | "desc" | null;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortState<T>>({ key: null, direction: null });

  const toggleRow = (idx: number) => {
    if (!selectable) return;
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
  };

  useEffect(() => {
    if (onRowSelect) onRowSelect([...selected].map((i) => data[i]));
  }, [selected, data, onRowSelect]);

  const sorted = useMemo(() => {
    if (!sort.key || !sort.direction) return data;
    const k = sort.key as string;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[k];
      const bv = b[k];
      if (typeof av === "number" && typeof bv === "number") {
        return sort.direction === "asc" ? av - bv : bv - av;
      }
      return sort.direction === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [data, sort]);

  return (
    <div className="w-[min(880px,95vw)] overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-[600px] w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-900/40">
          <tr>
            {selectable && <th className="w-10 p-3"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 select-none"
              >
                <button
                  className="inline-flex items-center gap-1"
                  disabled={!col.sortable}
                  aria-disabled={!col.sortable}
                  onClick={() =>
                    setSort((prev) =>
                      prev.key !== col.dataIndex
                        ? { key: col.dataIndex, direction: "asc" }
                        : prev.direction === "asc"
                        ? { key: col.dataIndex, direction: "desc" }
                        : { key: null, direction: null }
                    )
                  }
                >
                  {col.title}
                  {col.sortable && (
                    <span aria-hidden className="opacity-70">
                      {sort.key === col.dataIndex ? (sort.direction === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center text-sm text-gray-500">
                Loading...
              </td>
            </tr>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-sm text-gray-500">
                No data
              </td>
            </tr>
          )}
          {!loading &&
            sorted.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-100 dark:border-gray-800">
                {selectable && (
                  <td className="p-3">
                    <input
                      aria-label={`Select row ${idx + 1}`}
                      type="checkbox"
                      checked={selected.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-sm text-gray-800 dark:text-gray-100">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
