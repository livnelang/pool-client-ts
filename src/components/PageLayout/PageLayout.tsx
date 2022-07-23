import { ReactNode } from "react";
import "./PageLayout.scss";

interface Props {
  children?: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return <div className="PageLayout">{children}</div>;
};

export default PageLayout;
