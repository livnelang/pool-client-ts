import { ReactNode } from "react";
import "./FormContainer.scss";
interface Props {
  children?: ReactNode;
}
const FormContainer = ({ children }: Props) => {
  return <div className="FormContainer">{children}</div>;
};

export default FormContainer;
