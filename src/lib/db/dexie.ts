import { liveQuery as dexieLiveQuery } from 'dexie';
import { fromStore } from 'svelte/store';

type LiveQueryArguments<T> = Parameters<typeof dexieLiveQuery<T>>;
export function liveQuery<T>(...args: LiveQueryArguments<T>) {
  const observable = dexieLiveQuery(...args);
  return fromStore<T>({
    subscribe(run, unsubscribe) {
      return observable.subscribe(run, unsubscribe).unsubscribe;
    },
  });
}
