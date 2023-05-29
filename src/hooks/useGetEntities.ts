import { StoreNames, StoreValue } from "idb";
import { useCallback, useEffect, useState } from "react";

import { DragonFruitDB } from "../models/DragonFruitDB";

import useDB from "./useDB";

export function useGetEntities<Name extends StoreNames<DragonFruitDB>>(
  storeName: Name
) {
  const [entities, setEntities] = useState<StoreValue<DragonFruitDB, Name>[]>(
    []
  );
  const dbPromise = useDB();
  const refetch = useCallback(() => {
    dbPromise
      .then((db) => db.getAll(storeName))
      .then((asdf) => setEntities(asdf));
  }, [dbPromise, storeName]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { entities, refetch } as const;
}
