// scripts/seed-menus.js
// Seeds active menus and verified dishes into live Supabase PostgreSQL database
// with authentic, verified food image paths.

const { Client } = require('pg');

async function seedMenus() {
  const password = process.argv[2] || process.env.SUPABASE_DB_PASSWORD || 'Kotta&@2007_';
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

    // Ensure meal_type check constraint includes 'snacks'
    await client.query(`
      ALTER TABLE public.menus DROP CONSTRAINT IF EXISTS menus_meal_type_check;
      ALTER TABLE public.menus ADD CONSTRAINT menus_meal_type_check CHECK (meal_type = ANY (ARRAY['breakfast'::text, 'lunch'::text, 'snacks'::text, 'dinner'::text]));
    `);
    console.log('✅ Updated menus_meal_type_check to include snacks.');

    // Ensure menu_items category check constraint includes 'snack'
    await client.query(`
      ALTER TABLE public.menu_items DROP CONSTRAINT IF EXISTS menu_items_category_check;
      ALTER TABLE public.menu_items ADD CONSTRAINT menu_items_category_check CHECK (category = ANY (ARRAY['main'::text, 'bread'::text, 'rice'::text, 'dessert'::text, 'beverage'::text, 'side'::text, 'snack'::text]));
    `);
    console.log('✅ Updated menu_items_category_check to include snack.');

    // Today and next 6 days (7 total days)
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
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
            image_url: '/images/dishes/idli.jpg',
            description: 'Steamed fluffy rice-lentil cakes served with freshly ground coconut and spicy tomato chutney.'
          },
          {
            name: 'Crispy Medu Vada',
            category: 'side',
            image_url: '/images/dishes/vada.jpg',
            description: 'Golden crispy urad dal fritters with curry leaves and crushed black pepper.'
          },
          {
            name: 'South Indian Filter Coffee',
            category: 'beverage',
            image_url: '/images/dishes/coffee.jpg',
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
            image_url: '/images/dishes/rice.jpg',
            description: 'Hot steamed basmati rice with aromatic spiced lentil and mixed vegetable sambar.'
          },
          {
            name: 'Aloo Gobhi Roast',
            category: 'side',
            image_url: '/images/dishes/aloo_gobhi.jpg',
            description: 'Tender potatoes and cauliflower florets sautéed with ginger, cumin, and turmeric.'
          },
          {
            name: 'Fresh Tawa Phulka Rotis',
            category: 'bread',
            image_url: '/images/dishes/roti.jpg',
            description: 'Soft whole-wheat flatbreads puffed on open flame, lightly brushed with ghee.'
          },
          {
            name: 'Crispy Papad & Pickle',
            category: 'side',
            image_url: '/images/dishes/papad.jpg',
            description: 'Roasted papad with mixed spiced mango pickle and plain curd.'
          }
        ]
      },
      {
        meal_type: 'snacks',
        cutoff_time: '15:30:00',
        serving_start_time: '17:00:00',
        serving_end_time: '18:00:00',
        dishes: [
          {
            name: 'Masala Chai',
            category: 'beverage',
            image_url: '/images/dishes/tea.jpg',
            description: 'Fragrant ginger and cardamom spiced hot brewed Assam tea.'
          },
          {
            name: 'Osmania Biscuits & Samosa',
            category: 'snack',
            image_url: '/images/dishes/samosa.jpg',
            description: 'Crisp potato pea samosa served with Osmania butter biscuits.'
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
            image_url: '/images/dishes/paneer.jpg',
            description: 'Fresh malai cottage cheese cubes in mildly spiced rich velvety tomato gravy.'
          },
          {
            name: 'Yellow Dal Tadka',
            category: 'side',
            image_url: '/images/dishes/dal.jpg',
            description: 'Slow-cooked yellow pigeon peas tempered with cumin, garlic, and dried red chilies in ghee.'
          },
          {
            name: 'Jeera Pulao',
            category: 'rice',
            image_url: '/images/dishes/pulao.jpg',
            description: 'Fragrant basmati rice lightly sautéed with roasted cumin seeds.'
          },
          {
            name: 'Warm Gulab Jamun',
            category: 'dessert',
            image_url: '/images/dishes/gulab_jamun.jpg',
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

        // Clear any old/mismatched items for this specific menu to ensure clean state
        await client.query('DELETE FROM public.menu_items WHERE menu_id = $1;', [menuId]);

        for (const dish of config.dishes) {
          await client.query(`
            INSERT INTO public.menu_items (menu_id, name, description, category, is_vegetarian, image_url)
            VALUES ($1, $2, $3, $4, true, $5);
          `, [menuId, dish.name, dish.description, dish.category, dish.image_url]);
          itemsCreated++;
        }
      }
    }

    // Also globally fix any legacy menu items that might exist on other dates
    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/aloo_gobhi.jpg'
      WHERE name ILIKE '%gobhi%' OR name ILIKE '%gobi%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/idli.jpg'
      WHERE name ILIKE '%idli%' OR name ILIKE '%idly%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/vada.jpg'
      WHERE name ILIKE '%vada%' OR name ILIKE '%wada%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/coffee.jpg'
      WHERE name ILIKE '%coffee%' OR name ILIKE '%kaapi%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/tea.jpg'
      WHERE name ILIKE '%chai%' OR name ILIKE '%tea%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/paneer.jpg'
      WHERE name ILIKE '%paneer%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/dal.jpg'
      WHERE (name ILIKE '%dal%' OR name ILIKE '%tadka%') AND name NOT ILIKE '%makhani%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/roti.jpg'
      WHERE name ILIKE '%roti%' OR name ILIKE '%phulka%' OR name ILIKE '%chapati%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/rice.jpg'
      WHERE name ILIKE '%steamed rice%' OR (name ILIKE '%rice%' AND name NOT ILIKE '%pulao%' AND name NOT ILIKE '%biryani%');
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/pulao.jpg'
      WHERE name ILIKE '%pulao%' OR name ILIKE '%jeera%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/gulab_jamun.jpg'
      WHERE name ILIKE '%jamun%' OR name ILIKE '%gulab%';
    `);

    await client.query(`
      UPDATE public.menu_items
      SET image_url = '/images/dishes/samosa.jpg'
      WHERE name ILIKE '%samosa%';
    `);

    console.log(`🎉 Seeding complete! Created/updated ${menusCreated} menus with ${itemsCreated} verified menu items across 7 days.`);
    await client.end();
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
}

seedMenus();
