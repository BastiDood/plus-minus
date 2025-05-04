import {
  type InferOutput,
  finite,
  nullable,
  number,
  object,
  pipe,
  safeInteger,
  string,
  transform,
} from 'valibot';

export const EditEntry = object({
  id: pipe(number(), safeInteger()),
  name: pipe(
    string(),
    // eslint-disable-next-line no-undefined
    transform(value => (value.length === 0 ? undefined : value)),
  ),
  amount: pipe(
    nullable(pipe(number(), finite())),
    // eslint-disable-next-line no-undefined
    transform(value => value ?? undefined),
  ),
});

export type EditEntry = InferOutput<typeof EditEntry>;
