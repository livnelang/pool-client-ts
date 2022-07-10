import { ReactElement } from "react";
import "./MenuItem.scss";

export interface MenuItemProps {
  text: string;
  icon: JSX.Element;
  isActive: boolean;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <div className={`MenuItem ${props.isActive ? "active" : ""}`}>
      {props.icon}
      <span className="text">{props.text}</span>
    </div>
  );
};

export default MenuItem;
