import React from "react";
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

  const isEqualPathName = (path: string): boolean => {
    return (path === "main" && currentPathName === "") ? true :  path === currentPathName;
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

export default React.memo(Menu);
