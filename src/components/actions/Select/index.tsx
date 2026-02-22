import { IconButton } from "@components/actions/IconButton";
import { CloseIcon } from "@components/icons";
import cn from "classnames";
import React from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { label: React.ReactNode; value: string }[];
  label?: React.ReactNode;
  error?: React.ReactNode;
  onClear?: () => void;
  clearMessage?: string;
};

export const Select = ({
  className,
  options,
  label,
  error,
  clearMessage,
  onClear,
  ...props
}: SelectProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-medium">{label}</span>
      <div className="relative">
        <select
          {...props}
          value={props.value ?? "no-op"}
          className="my-0.5 w-full rounded-t-sm border-b-2 border-blue-900 bg-white px-1.5 py-0.5 outline-0"
        >
          {!!onClear && (
            <option hidden value="no-op">
              {clearMessage}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!!onClear && (
          <IconButton className="absolute top-0.5 right-3" onClick={onClear}>
            <CloseIcon className="size-4" />
          </IconButton>
        )}
      </div>

      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-5" />
      )}
    </div>
  );
};
