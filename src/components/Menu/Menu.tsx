import MenuItem, { MenuItemProps } from "../MenuItem/MenuItem";
import "./Menu.scss";

interface MenuProps {
  items: MenuItemProps[];
}

const Menu = (props: MenuProps) => {
  return (
    <div className="Menu">
      {props.items.map((m, idx) => {
        return <MenuItem key={`menu-item-${idx}`} {...m} />;
      })}
    </div>
  );
};

export default Menu;
