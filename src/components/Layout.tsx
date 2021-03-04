import { ReactNode } from "react";

import Navigation from "./Navigation";

interface LayoutProps {
  children: NonNullable<ReactNode>;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
