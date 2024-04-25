import { useCallback, useEffect } from "react";

import Header from "../features/ui/header.component";
import { Outlet } from "react-router-dom";
import { ViewToggle } from "../features/ui/view-toggle.component";
import { getStories } from "../features/stories/stories.slice";
import { useAppDispatch } from "../store";

export const Layout = () => {
  const dispatch = useAppDispatch();

  const initFetch = useCallback(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <Header />
      <Outlet />
      <footer className="w-full border-t-4 border-orange h-36 flex flex-col justify-center items-center">
        <h1 className="font-semibold mb-2">Hacker News</h1>
        <ViewToggle />
      </footer>
    </>
  );
};

export default Layout;
