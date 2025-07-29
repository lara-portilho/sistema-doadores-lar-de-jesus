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
        "bg-blue-900 text-white px-3 py-1 font-medium rounded-md cursor-pointer flex items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:bg-blue-900/80",
        props.className,
      )}
    >
      {children}
    </button>
  );
};
