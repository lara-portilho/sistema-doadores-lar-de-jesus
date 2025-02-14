import { Header } from "@components/layout/Header";
import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="px-15 py-5">{children}</div>
    </>
  );
};
