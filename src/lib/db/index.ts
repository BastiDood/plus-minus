import { Dexie, type EntityTable } from 'dexie';

export interface Entry {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
}

export interface Database extends Dexie {
  entry: EntityTable<Entry, 'id'>;
}

// Trust me, bro...
export const db = new Dexie('plus-minus') as Database;
db.version(1).stores({
  entry: '++id,amount,createdAt',
});
