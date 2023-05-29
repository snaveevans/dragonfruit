import { DBSchema, StoreNames, StoreValue } from "idb";
import { Task } from "./Tasks";

export interface DragonFruitDB extends DBSchema {
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-id': string }
  };
}

export type DragonFruitStoreNames = StoreNames<DragonFruitDB>
export type DragonFruitStoreValues = StoreValue<DragonFruitDB, DragonFruitStoreNames>
