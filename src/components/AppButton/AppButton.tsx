import "./AppButton.css";

export type AppButtonVariant = "primary" | "grey" | "transparent";

export interface AppButtonProps {
  text: string;
  onClick?: () => void;
  variant?: AppButtonVariant;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AppButton = (props: AppButtonProps) => {
  return (
    <div
      style={props.disabled ? { pointerEvents: "none", opacity: "0.7" } : {}}
      className={`AppButton ${props.variant || "primary"}`}
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
