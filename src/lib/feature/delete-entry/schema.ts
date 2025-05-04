import { type InferOutput, number, object, pipe, safeInteger } from 'valibot';

export const DeleteEntry = object({
  id: pipe(number(), safeInteger()),
});

export type DeleteEntry = InferOutput<typeof DeleteEntry>;
