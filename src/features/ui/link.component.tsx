import { DetailedHTMLProps } from "react";
import cn from "../../lib/cn";

export const Link = ({
  className,
  children,
  ...rest
}: DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  return (
    <a
      className={cn("cursor-pointer hover:underline", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
