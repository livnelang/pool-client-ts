import { useNavigate } from "react-router-dom";
import "./MenuItem.scss";

export interface MenuItemProps {
  text: string;
  icon: JSX.Element;
  path: string;
}

export interface ExtendedMenuItemProps extends MenuItemProps {
  isActive: boolean;
}

const MenuItem = (props: ExtendedMenuItemProps) => {
  const navigate = useNavigate();

  const handleClickMenuItem = (path: string) => {
    if (path === "main") {
      return navigate("./");
    }
    navigate(path);
  };

  return (
    <div
      className={`MenuItem ${props.isActive ? "active" : ""}`}
      onClick={() => handleClickMenuItem(props.path)}
    >
      {props.icon}
      <span className="text">{props.text}</span>
    </div>
  );
};

export default MenuItem;
