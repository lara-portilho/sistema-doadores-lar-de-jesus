import cn from "classnames";

type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "p-1 cursor-pointer rounded-full hover:bg-gray-300 transition-all",
        props.className,
      )}
    >
      {children}
    </button>
  );
};
