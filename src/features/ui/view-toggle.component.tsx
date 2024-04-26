import { HTMLAttributes, PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

import cn from "../../lib/cn";

export const ViewToggle = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { pathname } = useLocation();

  const ViewLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
    return (
      <Link
        to={to}
        className={cn(" w-24 text-center tracking-widest", {
          "cursor-pointer": pathname !== to,
          "text-orange font-extrabold": pathname === to,
        })}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className={cn("flex items-baseline", className)}>
      <ViewLink to="/">latest</ViewLink>
      <span>{"|"}</span>
      <ViewLink to={"/starred"}>starred</ViewLink>
    </div>
  );
};
