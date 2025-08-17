# 🎨 React Component Development Assignment (Storybook-first)

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

## ✅ Requirements covered
- TypeScript typings
- Responsive layout (container widths adapt)
- Basic accessibility
- Modern styling with Tailwind
- **Basic tests** (`npm test`)

## 🧪 Tests
```bash
npm test
```

## 📤 Submit
1) Push to GitHub (this repo).  
2) Publish Storybook (Chromatic recommended):
   - `npm install --save-dev chromatic`
   - Add script: `"chromatic": "npx chromatic --project-token=<YOUR_TOKEN>"`
   - Get token at https://www.chromatic.com/ after creating a project
   - Run: `npm run chromatic` → you'll get a shareable Storybook link

(Alternatively host static build on Vercel: `npm run build-storybook` → deploy the `storybook-static/` folder.)

---

Made to look clean, modern, and **interview-ready** ✨
