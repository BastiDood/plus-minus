import { type InferOutput, finite, nonEmpty, number, object, pipe, string } from 'valibot';

export const CreateEntry = object({
  name: pipe(string(), nonEmpty()),
  amount: pipe(number(), finite()),
});

export type CreateEntry = InferOutput<typeof CreateEntry>;
