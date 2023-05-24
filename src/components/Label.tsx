import { LabelHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ReactLabel = LabelHTMLAttributes<HTMLLabelElement>;

export interface Props {
  id: ReactLabel["id"];
  className?: ReactLabel["className"];
  children: ReactLabel["children"];
  "data-testid"?: string;
  error?: boolean;
}

const Label = forwardRef<HTMLLabelElement, Props>((props, ref) => (
  <label
    id={props.id}
    htmlFor={props.id}
    ref={ref}
    className={clsx("flex", "items-center", props.className)}
    data-testid={props["data-testid"]}
  >
    {props.children}
  </label>
));

export default Label;
