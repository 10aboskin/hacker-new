import { DetailedHTMLProps } from "react";
import cn from "../../lib/cn";

export const StoryDetailLink = ({
  className,
  children,
  ...rest
}: DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  return (
    <a className={cn("cursor-pointer hover:underline", className)} {...rest}>
      {children}
    </a>
  );
};

export default StoryDetailLink;
