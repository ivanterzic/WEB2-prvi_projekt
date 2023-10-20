import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
    user: 'ivan',
    host: 'dpg-ckp5ak41tcps739j2ceg-a.frankfurt-postgres.render.com',
    database: 'web2lab1_df6p',
    password: '4qZ0lzhtpdWvRGA6oOwh5liS3KOu1YKx',
    port: 5432,
    ssl: true
});
  
const db = {
      query: (text, params) => {
          const start = Date.now();
          return pool.query(text, params)
              .then(res => {
                  const duration = Date.now() - start;
                  return res;
              });
      },
      pool: pool
}

export { db };