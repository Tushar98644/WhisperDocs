import {Config} from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config({path:"./.env.local"})

console.log(process.env.DATABASE_URL)

export default {
    driver: 'pg',
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    }
} satisfies Config