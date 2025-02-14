import cn from "classnames";
import React from "react";

type RadioInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  options: { label: React.ReactNode; value: string }[];
  label?: React.ReactNode;
  error?: React.ReactNode;
};

export const RadioInput = ({
  className,
  options,
  label,
  error,
  ...props
}: RadioInputProps) => {
  return (
    <div className={cn("", className)}>
      <span className="font-medium">{label}</span>
      {options.map((option) => (
        <label className="flex items-center gap-2" key={option.value}>
          <input {...props} value={option.value} type="radio" />
          <span className="font-medium">{option.label}</span>
        </label>
      ))}
      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
};
