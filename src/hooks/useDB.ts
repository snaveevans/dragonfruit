import { IDBPDatabase, openDB } from "idb";
import { useState } from "react";
import { DragonFruitDB } from "../models/DragonFruitDB";

let dbPromiseSingleton: Promise<IDBPDatabase<DragonFruitDB>>;

export default function useDB() {
  const [dbPromise] = useState<Promise<IDBPDatabase<DragonFruitDB>>>(
    () => {
      if (!dbPromiseSingleton) {
        dbPromiseSingleton = openDB<DragonFruitDB>("dragonfruit-db", 1, {
          upgrade(db) {
            const taskStore = db.createObjectStore("tasks");
            taskStore.createIndex("by-id", "id");
          },
        });
      }
      return dbPromiseSingleton;
    }
  );

  return dbPromise;
}
