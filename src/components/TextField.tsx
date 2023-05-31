import { forwardRef } from "react";
import Input, { Props as InputProps } from "./Input";
import Label, { Props as LabelProps } from "./Label";
import clsx from "clsx";

export interface Props {
  id: Required<InputProps["id"]>;
  value: InputProps["value"];
  placeholder?: InputProps["placeholder"];
  onChange: InputProps["onChange"];
  label: LabelProps["children"];
  error?: boolean;
  helperText?: string;
  className?: string;
  "data-testid"?: string;
  inputProps?: Partial<InputProps>;
  labelProps?: Partial<LabelProps>;
}

const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <span
    className={clsx("grow", props.className)}
    data-testid={props["data-testid"]}
  >
    <Label
      id={props.id}
      {...props.labelProps}
      className={clsx(
        "mb-1",
        props.error && "text-rose-600",
        props.labelProps?.className
      )}
    >
      {props.label}
    </Label>
    <Input
      ref={ref}
      id={props.id}
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      error={props.error}
      {...props.inputProps}
    />
    <span
      className={clsx(
        "text-sm",
        props.error ? "text-rose-600" : "text-gray-600",
        "h-5"
      )}
    >
      {props.helperText}
    </span>
  </span>
));

export default TextField;
