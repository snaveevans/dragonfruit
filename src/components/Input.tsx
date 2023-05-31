import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ReactInput = InputHTMLAttributes<HTMLInputElement>;

export interface Props {
  id: ReactInput["id"];
  value: ReactInput["value"];
  placeholder?: ReactInput["placeholder"];
  type?: ReactInput["type"];
  className?: ReactInput["className"];
  onChange: ReactInput["onChange"];
  "data-testid"?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    id={props.id}
    ref={ref}
    value={props.value}
    placeholder={props.placeholder}
    className={clsx(
      props.className,
      "border",
      "border-purple-700",
      "hover:border-purple-900",
      "rounded",
      "p-1.5",
      "h-10"
    )}
    type={props.type}
    onChange={props.onChange}
    data-testid={props["data-testid"]}
  />
));

export default Input;
