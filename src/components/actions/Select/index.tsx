import cn from "classnames";
import React from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { label: React.ReactNode; value: string }[];
  label?: React.ReactNode;
  error?: React.ReactNode;
};

export const Select = ({
  className,
  options,
  label,
  error,
  ...props
}: SelectProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-medium">{label}</span>
      <select
        {...props}
        className="bg-white border-b-2 border-blue-900 rounded-t-sm outline-0 px-1.5 py-0.5 my-0.5"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
};
