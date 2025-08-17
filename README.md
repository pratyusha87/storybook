# 🎨 React Component Development Assignment

Two components built with **React + TypeScript + Tailwind**, documented in **Storybook**.

## 🚀 Run locally
```bash
npm install
npm run storybook
# open http://localhost:6006
```

## 🧩 Components
### InputField
- Label, placeholder, helper & error text
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: sm, md, lg
- **Optional done**: clear button, password toggle
- **Light & Dark theme** (toggle from Storybook toolbar)
- A11y: label 'for', `aria-invalid`, `aria-describedby`

### DataTable
- Displays tabular data
- Column sorting (click header cycles ↑ ↓ off)
- Multi-row selection with checkboxes
- Loading & Empty states
- `onRowSelect` returns selected rows

