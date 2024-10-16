import React from "react";
import "./style.scss";

const Container = ({ children }: { children: React.ReactElement }) => {
  return <div className="container">{children}</div>;
};

export default Container;
