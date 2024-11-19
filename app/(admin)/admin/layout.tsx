import React from "react";
import Header from "../components/header/Header";

function layout({ children }: { children: React.ReactNode }) {
  return <Header>{children}</Header>;
}

export default layout;
