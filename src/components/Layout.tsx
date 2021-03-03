import { ReactNode } from "react";

import Container from "@material-ui/core/Container";

import Navigation from "./Navigation";

interface LayoutProps {
  children: NonNullable<ReactNode>;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <br />
      <Container component="main">{children}</Container>
    </>
  );
}

export default Layout;
