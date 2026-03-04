"use client";

import { forwardRef } from "react";

interface FloatingLabelFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  error?: string;
  id: string;
}

export const FloatingLabelField = forwardRef<
  HTMLInputElement,
  FloatingLabelFieldProps
>(({ label, error, id, className = "", ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder=" "
        className={`peer w-full min-w-0 rounded-lg border bg-transparent pt-6 pb-2 pl-3 pr-3 text-base text-stone-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-offset-0 disabled:bg-stone-50 disabled:text-stone-500 dark:text-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 sm:text-sm [touch-action:manipulation] ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/50 dark:border-red-500"
            : "border-stone-300 hover:border-stone-400 dark:border-gray-600 dark:hover:border-gray-500"
        } ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 transition-all duration-200 origin-left peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-stone-600 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium dark:text-gray-400 dark:peer-focus:text-gray-300"
      >
        {label}
      </label>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FloatingLabelField.displayName = "FloatingLabelField";
