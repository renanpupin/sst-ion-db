import { defineConfig } from "drizzle-kit";

export default defineConfig({
        "out": "./db/migrations",
        "schema": "./drizzle/schema.ts",
        "breakpoints": true,
        "dialect": "mysql"
    }
);
