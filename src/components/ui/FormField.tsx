"use client";

import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border px-3 py-2.5 text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-offset-0 disabled:bg-stone-50 disabled:text-stone-500 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/50"
              : "border-stone-300 hover:border-stone-400"
          } ${className}`}
          {...props}
        />
        {error && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
