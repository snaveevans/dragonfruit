import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ReactButton = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  type?: ReactButton["type"];
  children: ReactButton["children"];
  className?: ReactButton["className"];
  onClick?: ReactButton["onClick"];
  "data-testid"?: string;
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button
    ref={ref}
    className={clsx(
      props.className,
      "bg-purple-700",
      "hover:bg-purple-900",
      "text-white",
      "font-bold",
      "py-1",
      "px-2",
      "rounded"
    )}
    type={props.type}
    onClick={props.onClick}
    data-testid={props["data-testid"]}
  >
    {props.children}
  </button>
));

export default Button;
