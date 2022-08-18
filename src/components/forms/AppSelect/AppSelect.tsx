import "./AppSelect.scss";
import { useEffect, useState } from "react";
import Select from "react-select";

export interface AppSelectOption<T> {
  label: string;
  value: T;
}

interface Props<T> {
  label: string;
  onValueChange: (option: AppSelectOption<T>) => void;
  options: AppSelectOption<T>[];
  defaultOption?: AppSelectOption<T>;
  placeholder?: string;
  isDisabled?: boolean;
  error?: boolean;
}

const AppSelect = <T,>({
  options,
  onValueChange,
  defaultOption,
  label,
  placeholder,
  isDisabled,
  error,
}: Props<T>) => {
  const [selectedValue, setSelectedValue] = useState<AppSelectOption<T> | null>(
    null
  );

  const handleValueChange = (newValue: AppSelectOption<T>) => {
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
      <label className={`react-select-class ${error ? "error" : ""}`}>
        {label}
      </label>
      <Select
        isDisabled={isDisabled ?? false}
        placeholder={placeholder ?? ""}
        className="react-select-class"
        options={options}
        value={selectedValue}
        onChange={(newValue) =>
          handleValueChange(newValue as AppSelectOption<T>)
        }
      />
    </div>
  );
};

export default AppSelect;
