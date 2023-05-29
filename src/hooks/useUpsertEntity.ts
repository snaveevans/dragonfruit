import { useCallback, useRef } from "react";
import useDB from "./useDB";
import {
  DragonFruitStoreNames,
  DragonFruitStoreValues,
} from "../models/DragonFruitDB";

export default function useUpsertEntity<TEntity extends DragonFruitStoreValues>(
  storeName: DragonFruitStoreNames,
  keyGetter: (entity: TEntity) => string
) {
  const storeNameRef = useRef(storeName);
  const dbPromise = useDB();
  const upsert = useCallback(
    async (entity: TEntity) => {
      const db = await dbPromise;
      db.put(storeNameRef.current, entity, keyGetter(entity));
    },
    [dbPromise]
  );

  return upsert;
}
