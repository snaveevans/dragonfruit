import type { Key, ReactNode, LiHTMLAttributes, OlHTMLAttributes } from "react";

type ReactOl = OlHTMLAttributes<HTMLUListElement>;
type ReactLi = LiHTMLAttributes<HTMLLIElement>;

export interface Props<TItem> {
  items: Array<TItem>;
  keyGetter: (item: TItem) => Key;
  renderer: (item: TItem) => ReactNode;
  liProps?: Pick<ReactLi, "className">;
  className?: ReactOl["className"];
}

export default function List<TItem>(props: Props<TItem>) {
  return (
    <ul className={props.className}>
      {props.items.map((item) => (
        <li className={props.liProps?.className} key={props.keyGetter(item)}>
          {props.renderer(item)}
        </li>
      ))}
    </ul>
  );
}
