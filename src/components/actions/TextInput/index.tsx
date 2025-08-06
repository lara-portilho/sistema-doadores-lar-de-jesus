import { CloseIcon } from "@components/icons";
import cn from "classnames";
import React from "react";
import { IconButton } from "../IconButton";

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  icon?: React.ReactNode;
  onClear?: () => void;
};

export const TextInput = ({
  className,
  label,
  error,
  icon,
  onClear,
  ...props
}: TextInputProps) => {
  return (
    <label className={cn("flex flex-col", className)}>
      <span className="font-medium">{label}</span>
      <div className="relative">
        {!!icon && <div className="absolute top-2 left-1">{icon}</div>}
        <input
          {...props}
          className={cn(
            "my-0.5 w-full rounded-t-sm border-b-2 border-blue-900 bg-white px-1.5 py-0.5 outline-0",
            {
              "pl-6": !!icon,
            },
          )}
        />
        {!!onClear && (
          <IconButton className="absolute top-1 right-0.5" onClick={onClear}>
            <CloseIcon className="size-4" />
          </IconButton>
        )}
      </div>

      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-5" />
      )}
    </label>
  );
};
