const { Client } = require('pg');

async function inspectCategory() {
  const client = new Client({
    host: 'db.ugdgagtytgpwajpnrzzs.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.SUPABASE_DB_PASSWORD || 'Kotta&@2007_',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  const res = await client.query(`
    SELECT conname, pg_get_constraintdef(oid)
    FROM pg_constraint
    WHERE conname = 'menu_items_category_check';
  `);
  console.log('menu_items_category_check:', res.rows);
  await client.end();
}

inspectCategory().catch(console.error);
