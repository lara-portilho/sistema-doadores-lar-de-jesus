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
        "cursor-pointer rounded-full p-1 transition-all hover:bg-gray-300",
        props.className,
      )}
    >
      {children}
    </button>
  );
};
