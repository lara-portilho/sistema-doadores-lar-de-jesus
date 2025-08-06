import cn from "classnames";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-blue-900 px-3 py-1 font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-900/80",
        props.className,
      )}
    >
      {children}
    </button>
  );
};
