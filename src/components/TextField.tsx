import { forwardRef } from "react";
import Input, { Props as InputProps } from "./Input";
import Label, { Props as LabelProps } from "./Label";
import clsx from "clsx";

export interface Props {
  id: Required<InputProps["id"]>;
  value: InputProps["value"];
  onChange: InputProps["onChange"];
  label: LabelProps["children"];
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
    <Label id={props.id} {...props.labelProps}>
      {props.label}
    </Label>
    <Input
      ref={ref}
      id={props.id}
      type="text"
      value={props.value}
      onChange={props.onChange}
      {...props.inputProps}
    />
  </span>
));

export default TextField;
