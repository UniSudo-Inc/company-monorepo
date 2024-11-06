import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema/db.ts',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env['NEON_DATABASE_URL']!,
  },
});
