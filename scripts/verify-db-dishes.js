const { Client } = require('pg');

async function verifyDbDishes() {
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
    SELECT DISTINCT name, category, image_url
    FROM public.menu_items
    ORDER BY name;
  `);

  console.log('--- SUPABASE DISTINCT DISHES ---');
  console.table(res.rows);

  const mealCount = await client.query(`
    SELECT meal_type, count(*) as count
    FROM public.menus
    GROUP BY meal_type;
  `);
  console.log('--- SUPABASE MENUS BY MEAL TYPE ---');
  console.table(mealCount.rows);

  await client.end();
}

verifyDbDishes().catch(console.error);
