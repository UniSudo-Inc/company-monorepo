import base from '@company/configs/prettier/base.mjs'
import sql from '@company/configs/prettier/sql.mjs'

/** @type {import("prettier").Options} */
export default {
  ...base,
  ...sql,
}
