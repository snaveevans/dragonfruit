import { useCallback, useRef } from "react";
import useDB from "./useDB";
import {
  DragonFruitStoreNames,
  DragonFruitStoreValues,
} from "../models/DragonFruitDB";

export default function useRemoveEntity<TEntity extends DragonFruitStoreValues>(
  storeName: DragonFruitStoreNames,
  keyGetter: (entity: TEntity) => string
) {
  const storeNameRef = useRef(storeName);
  const dbPromise = useDB();
  const remove = useCallback(
    async (entity: TEntity) => {
      const db = await dbPromise;
      await db.delete(storeNameRef.current, keyGetter(entity));
    },
    [dbPromise]
  );

  return remove;
}
