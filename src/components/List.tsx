import type { Key, ReactNode } from "react";

export interface Props<TItem> {
  items: Array<TItem>;
  keyGetter: (item: TItem) => Key;
  renderer: (item: TItem) => ReactNode;
}

export default function List<TItem>(props: Props<TItem>) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={props.keyGetter(item)}>{props.renderer(item)}</li>
      ))}
    </ul>
  );
}
