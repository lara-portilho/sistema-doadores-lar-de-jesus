import cn from "classnames";
import React from "react";

import { IMaskInput, IMaskInputProps } from "react-imask";

type MaskInputProps = IMaskInputProps<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  icon?: React.ReactNode;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
};

export const MaskInput = ({
  className,
  label,
  error,
  icon,
  onChange,
  name,
  ref,
  ...props
}: MaskInputProps) => {
  return (
    <label className={cn("relative flex flex-col", className)}>
      <span className="font-medium">{label}</span>
      <div className="relative">
        {!!icon && <div className="absolute top-2 left-1">{icon}</div>}
        <IMaskInput
          {...props}
          inputRef={ref}
          onAccept={(value) => {
            onChange({ target: { name, value } });
          }}
          className={cn(
            "my-0.5 w-full rounded-t-sm border-b-2 border-blue-900 bg-white px-1.5 py-0.5 outline-0",
            {
              "pl-6": !!icon,
            },
          )}
        />
      </div>

      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-5" />
      )}
    </label>
  );
};
