import astro from '@company/configs/prettier/astro.mjs';
import tailwind from '@company/configs/prettier/tailwind.mjs';

/** @type {import("prettier").Options} */
export default {
  ...astro,
  ...tailwind,
};
