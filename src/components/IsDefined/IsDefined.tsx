import { ReactNode } from "react";

interface Props {
  value: any;
  children: ReactNode;
}

const IsDefined = ({ value, children }: Props): JSX.Element => {
  if (value === null || value === undefined || value === false) {
    return <></>;
  }
  return <>{children}</>;
};

export default IsDefined;
