import { useCallback, useEffect } from "react";

import Footer from "../features/ui/footer.component";
import Header from "../features/ui/header.component";
import { Outlet } from "react-router-dom";
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
      <main className="px-24 mb-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
