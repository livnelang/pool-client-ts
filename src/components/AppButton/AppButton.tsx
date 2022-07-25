import "./AppButton.css";
import React from "react";

export type AppButtonVariant = "primary" | "grey" | "transparent";
export type AppButtonSize = "regular" | "small";

export interface AppButtonProps {
  text: string;
  onClick?: () => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AppButton = (props: AppButtonProps) => {
  return (
    <div
      style={props.disabled ? { pointerEvents: "none", opacity: "0.7" } : {}}
      className={`AppButton ${props.variant || "primary"} ${
        props.size ?? "regular"
      }`}
      onClick={props.onClick}
    >
      <>
        {props.text}
        {props.children ?? null}
      </>
    </div>
  );
};

export default AppButton;
