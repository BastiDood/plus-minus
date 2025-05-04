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

const dexie = new Dexie('plus-minus', { autoOpen: false });
dexie.version(1).stores({
  entry: '++id,amount,createdAt',
});

// Trust me, bro...
export const ready = dexie.open() as unknown as Promise<Database>;
