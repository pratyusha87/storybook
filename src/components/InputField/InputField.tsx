import React, { useId, useState } from "react";

export type InputVariant = "filled" | "outlined" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  loading?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  clearable?: boolean;        // optional
  passwordToggle?: boolean;   // optional
}

const sizeClasses: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-10 px-3.5 text-base rounded-xl",
  lg: "h-12 px-4 text-base rounded-2xl",
};

const variantClasses: Record<InputVariant, string> = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 focus:ring-2 focus:ring-gray-300",
  outlined:
    "bg-transparent border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-gray-300",
  ghost:
    "bg-transparent border border-transparent focus:ring-2 focus:ring-gray-300",
};

const baseInput =
  "w-full outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  helperText,
  errorMessage,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
  value,
  onChange,
  ...props
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = errorMessage
    ? `${inputId}-error`
    : helperText
    ? `${inputId}-help`
    : undefined;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password" && passwordToggle;
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  const val = (value as string | number | readonly string[] | undefined) ?? "";

  return (
    <div className="w-[min(520px,90vw)]">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          className={[
            baseInput,
            sizeClasses[size],
            variantClasses[variant],
            invalid ? "border-red-400 focus:ring-red-400" : "",
            loading || props.disabled ? "opacity-60 cursor-not-allowed" : "",
            "pr-20" // space for buttons
          ].join(" ")}
          type={actualType}
          value={val}
          onChange={onChange}
          {...props}
        />
        {/* Right controls */}
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {clearable && String(val).length > 0 && (
            <button
              type="button"
              aria-label="Clear input"
              className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700"
              onClick={(e) => {
                props.onChange?.({
                  ...({} as any),
                  target: { value: "" }
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              Clear
            </button>
          )}
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>
      </div>
      {loading && <p className="helper">Loading…</p>}
      {!loading && helperText && !errorMessage && (
        <p id={`${inputId}-help`} className="helper">
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p id={`${inputId}-error`} className="error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
