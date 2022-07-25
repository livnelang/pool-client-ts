import "./AppSelect.scss";
import Select from "react-select";
import { useEffect, useState } from "react";

export interface AppSelectOption {
  label: string;
  value: any;
}

interface Props {
  label: string;
  onValueChange: (option: AppSelectOption) => void;
  options: AppSelectOption[];
  defaultOption?: AppSelectOption;
  placeholder?: string;
  isDisabled?: boolean;
}

const AppSelect = ({
  options,
  onValueChange,
  defaultOption,
  label,
  placeholder,
  isDisabled,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<AppSelectOption | null>(
    null
  );

  const handleValueChange = (newValue: any) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  useEffect(() => {
    if (defaultOption) {
      setSelectedValue(defaultOption);
    }
  }, [defaultOption]);

  return (
    <div className="AppSelect">
      <label>{label}</label>
      <Select
        isDisabled={isDisabled ?? false}
        placeholder={placeholder ?? ""}
        className="react-select-class"
        options={options}
        value={selectedValue}
        onChange={(newValue) => handleValueChange(newValue)}
      />
    </div>
  );
};

export default AppSelect;
