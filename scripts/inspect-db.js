const { Client } = require('pg');

async function check() {
  const client = new Client({
    host: 'db.ugdgagtytgpwajpnrzzs.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.SUPABASE_DB_PASSWORD || 'Kotta&@2007_',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  const cols = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'meal_plans';
  `);
  console.log('Columns on meal_plans:');
  console.table(cols.rows);

  const cons = await client.query(`
    SELECT conname, pg_get_constraintdef(c.oid)
    FROM pg_constraint c
    JOIN pg_class r ON r.oid = c.conrelid
    WHERE r.relname = 'meal_plans';
  `);
  console.log('Constraints on meal_plans:');
  console.table(cons.rows);

  await client.end();
}

check().catch(console.error);
