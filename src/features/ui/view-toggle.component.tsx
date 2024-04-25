import { Link, useLocation } from "react-router-dom";

import { HTMLAttributes } from "react";
import cn from "../../lib/cn";

export const ViewToggle = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { pathname } = useLocation();

  return (
    <div className={cn("flex items-center", className)}>
      <Link
        to="/"
        className={cn("w-20 text-center", {
          "cursor-pointer": pathname !== "/",
          "text-orange font-bold": pathname === "/",
        })}
      >
        latest
      </Link>
      <span>{"|"}</span>
      <Link
        to={"/starred"}
        className={cn("w-20 text-center", {
          "cursor-pointer": pathname !== "/starred",
          "text-orange font-bold": pathname === "/starred",
        })}
      >
        starred
      </Link>
    </div>
  );
};
