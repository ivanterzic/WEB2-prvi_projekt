import { Pool } from 'pg';
declare const db: {
    query: (text: any, params: any) => Promise<import("pg").QueryArrayResult<any[]>>;
    pool: Pool;
};
export { db };
