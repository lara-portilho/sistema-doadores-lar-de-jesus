/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "classnames";
import React, { useRef } from "react";
import { IMaskInput, IMaskInputProps } from "react-imask";

type InputMaskProps = Omit<IMaskInputProps<HTMLInputElement>, "onChange"> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  ref: React.Ref<HTMLInputElement>;
  mask: any;
};

export const InputMask = ({
  className,
  label,
  error,
  onChange,
  name,
  mask,
  ref,
  ...props
}: InputMaskProps) => {
  const elRef = useRef(null);

  return (
    <label className={cn("relative flex flex-col", className)}>
      <span className="font-medium">{label}</span>
      <IMaskInput
        {...props}
        ref={elRef}
        inputRef={ref}
        mask={mask}
        onAccept={(value) => {
          onChange({ target: { name, value } });
        }}
        className="my-0.5 rounded-t-sm border-b-2 border-blue-900 bg-white px-1.5 py-0.5 outline-0"
      />

      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="h-5" />
      )}
    </label>
  );
};
