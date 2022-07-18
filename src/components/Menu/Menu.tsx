import { useLocation } from "react-router-dom";
import MenuItem, { MenuItemProps } from "../MenuItem/MenuItem";
import "./Menu.scss";

interface MenuProps {
  items: MenuItemProps[];
}

const Menu = (props: MenuProps) => {
  const location = useLocation();
  const currentPathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  console.log(currentPathName);

  const isEqualPathName = (path: string) => {
    return path === currentPathName;
  };

  return (
    <div className="Menu">
      {props.items.map((m, idx) => {
        return (
          <MenuItem
            key={`menu-item-${idx}`}
            {...m}
            isActive={isEqualPathName(m.path)}
          />
        );
      })}
    </div>
  );
};

export default Menu;
