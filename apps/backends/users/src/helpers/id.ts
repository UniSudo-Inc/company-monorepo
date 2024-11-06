import { nanoid } from 'nanoid';
import { type BRAND } from 'zod';

export type Id<T extends string> = string & BRAND<T>;

export const randomId = <T extends string>(): Id<T> => nanoid() as Id<T>;
