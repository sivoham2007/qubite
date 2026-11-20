// scripts/seed-menus.js
// Seeds active menus and verified dishes into live Supabase PostgreSQL database

const { Client } = require('pg');

async function seedMenus() {
  const password = process.argv[2] || process.env.SUPABASE_DB_PASSWORD;
  if (!password) {
    console.error('❌ Missing database password.');
    console.log('Usage: node scripts/seed-menus.js <password>');
    process.exit(1);
  }
  const client = new Client({
    host: 'db.ugdgagtytgpwajpnrzzs.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: password,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL database.');

    // Today and next 6 days
    const today = new Date();
    const dates = [];
    for (let i = -1; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().slice(0, 10));
    }

    const mealConfigs = [
      {
        meal_type: 'breakfast',
        cutoff_time: '06:00:00',
        serving_start_time: '07:30:00',
        serving_end_time: '09:30:00',
        dishes: [
          {
            name: 'Idli with Coconut & Tomato Chutney',
            category: 'main',
            image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
            description: 'Steamed fluffy rice-lentil cakes served with freshly ground coconut and spicy tomato chutney.'
          },
          {
            name: 'Crispy Medu Vada',
            category: 'side',
            image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
            description: 'Golden crispy urad dal fritters with curry leaves and crushed black pepper.'
          },
          {
            name: 'South Indian Filter Coffee',
            category: 'beverage',
            image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
            description: 'Traditional freshly brewed chicory-infused decoction with frothed whole milk.'
          }
        ]
      },
      {
        meal_type: 'lunch',
        cutoff_time: '10:00:00',
        serving_start_time: '12:30:00',
        serving_end_time: '14:30:00',
        dishes: [
          {
            name: 'Steamed Rice with Sambar',
            category: 'rice',
            image_url: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&auto=format&fit=crop&q=80',
            description: 'Hot steamed basmati rice with aromatic spiced lentil and mixed vegetable sambar.'
          },
          {
            name: 'Aloo Gobhi Roast',
            category: 'main',
            image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
            description: 'Tender potatoes and cauliflower florets sautéed with ginger, cumin, and turmeric.'
          },
          {
            name: 'Fresh Tawa Phulka Rotis',
            category: 'bread',
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
            description: 'Soft whole-wheat flatbreads puffed on open flame, lightly brushed with ghee.'
          }
        ]
      },
      {
        meal_type: 'dinner',
        cutoff_time: '17:00:00',
        serving_start_time: '19:30:00',
        serving_end_time: '21:30:00',
        dishes: [
          {
            name: 'Paneer Butter Masala',
            category: 'main',
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
            description: 'Fresh malai cottage cheese cubes in mildly spiced rich velvety tomato gravy.'
          },
          {
            name: 'Yellow Dal Tadka',
            category: 'main',
            image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
            description: 'Slow-cooked yellow pigeon peas tempered with cumin, garlic, and dried red chilies in ghee.'
          },
          {
            name: 'Warm Gulab Jamun',
            category: 'dessert',
            image_url: 'https://images.unsplash.com/photo-1589119908995-c6837fa14d48?w=600&auto=format&fit=crop&q=80',
            description: 'Soft golden milk-solid dumplings soaked in rose and cardamom infused sugar syrup.'
          }
        ]
      }
    ];

    let menusCreated = 0;
    let itemsCreated = 0;

    for (const menuDate of dates) {
      for (const config of mealConfigs) {
        // Upsert menu
        const menuRes = await client.query(`
          INSERT INTO public.menus (menu_date, meal_type, cutoff_time, serving_start_time, serving_end_time, is_published)
          VALUES ($1, $2, $3, $4, $5, true)
          ON CONFLICT (menu_date, meal_type)
          DO UPDATE SET
            cutoff_time = EXCLUDED.cutoff_time,
            serving_start_time = EXCLUDED.serving_start_time,
            serving_end_time = EXCLUDED.serving_end_time,
            is_published = true
          RETURNING id;
        `, [menuDate, config.meal_type, config.cutoff_time, config.serving_start_time, config.serving_end_time]);

        const menuId = menuRes.rows[0].id;
        menusCreated++;

        for (const dish of config.dishes) {
          await client.query(`
            INSERT INTO public.menu_items (menu_id, name, description, category, is_vegetarian, image_url)
            VALUES ($1, $2, $3, $4, true, $5)
            ON CONFLICT DO NOTHING;
          `, [menuId, dish.name, dish.description, dish.category, dish.image_url]);
          itemsCreated++;
        }
      }
    }

    console.log(`🎉 Seeding complete! Created/updated ${menusCreated} menus with ${itemsCreated} menu items across 7 days.`);
    await client.end();
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
}

seedMenus();
