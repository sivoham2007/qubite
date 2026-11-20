const { Client } = require('pg');

async function enforceDbConstraint() {
  const client = new Client({
    host: 'db.ugdgagtytgpwajpnrzzs.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.argv[2] || process.env.SUPABASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(`
      ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS chk_msruas_email;
      ALTER TABLE public.profiles ADD CONSTRAINT chk_msruas_email CHECK (email ILIKE '%@msruas.ac.in');
    `);
    console.log('✅ PostgreSQL constraint chk_msruas_email added to public.profiles!');
    await client.end();
  } catch (e) {
    console.error('Error applying constraint:', e.message);
  }
}

enforceDbConstraint();
