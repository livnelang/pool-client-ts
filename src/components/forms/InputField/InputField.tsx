import {
  forwardRef,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "./InputField.scss";

import { HTMLInputTypeAttribute } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: HTMLInputTypeAttribute;
  error: boolean;
  placeholder?: string;
}

const InputField = (props: InputFieldProps, fRef: any) => {
  const { name, label, type, error, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  /*
   * useImperativeHandle customizes the instance value that is exposed to parent components when using ref.
   * As always, imperative code using refs should be avoided in most cases.
   * useImperativeHandle should be used with forwardRef:
   */
  useImperativeHandle(fRef, () => ({
    handleSomeStuff: () => {
      if (error) {
        if (inputRef.current === null) {
          return;
        } else {
          console.log("handle some stuff");
          inputRef.current.classList.add("error");
        }
      }
    },
  }));

  useEffect(() => {
    if (!props.error || inputRef.current === null) {
      return;
    }
    if (!inputRef.current.classList.contains("error")) {
      inputRef.current.classList.add("error");
    }
  }, [props.error]);

  return (
    <div className="InputField">
      {label === undefined ? null : (
        <label htmlFor={name} className={error ? "input-label-error" : ""}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        {...rest}
        onAnimationEnd={(event) =>
          event.currentTarget.classList.remove("error")
        }
      />
    </div>
  );
};

export default forwardRef(InputField);
