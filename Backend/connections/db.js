// import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();

// Подключение к базе данных SQLite, создание таблицы
const db = new sqlite3.Database('./db/database.db', err => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Создаем таблицу, если она не существует, и добавляем тестовые записи
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`, err => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Table "users" created or already exists.');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      refreshToken TEXT NOT NULL,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`, err => {
    if (err) {
      console.error('Error creating tokens table:', err.message);
    } else {
      console.log('Table "tokens" created or already exists.');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating products table:', err.message);
    } else {
      console.log('Table "products" created or already exists.');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quantity INTEGER NOT NULL,
      productId INTEGER,
      userId INTEGER,
      FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`, err => {
    if (err) {
      console.error('Error creating carts table:', err.message);
    } else {
      console.log('Table "carts" created or already exists.');
    }
  });

  // Проверяем, есть ли записи в таблице
  db.get(`SELECT COUNT(*) as count FROM products`, (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      const insert = db.prepare(`INSERT INTO products (name,type,img,description,price) VALUES (?, ?, ?, ?, ?)`);
      const products = [
        {
          id: 1,
          type: 'Обвязки',
          name: 'Привязь Singing Rock "EXPERT III speed"',
          description:"Комфортная привязь для промальпа. Увеличенный кушак и ремни, что обеспечивает комфортную работу. Передняя часть отстегивается карабином",
          price: 28000,
          img: 'https://avatars.mds.yandex.net/i?id=d5540cd661b8e0ce1ba3766b1cbe8e94_l-5233591-images-thumbs&n=13',
        },
        {
          id: 2,
          type: 'Карабины',
          name: "Карабин VENTO овал",
          description: "Карабин овальный с байнентной муфтой. Небольшой размер позволяет максимально удобно осуществлять перестежку. Овальная форма идеально подходит для полиспастов и спусковых устройств",
          price: 1200,
          img: 'https://www.kant.ru/upload/iblock/89a/89abc1b1eb1e494901b4bcfd5d6e9067.jpg',
        },
        {
          id: 3,
          type: 'Веревка',
          name: "Веревка Lanex",
          description: "Свойство - статика, состав - полиамид. Особенность веревки - сохранение прочности, мягкости на протяжении многих лет",
          price: 80,
          img: 'https://i.ebayimg.com/images/g/JUsAAOSwHhRbyZEW/s-l1600.jpg'
        },
        {
          id: 4,
          type: 'Зажимы',
          name: 'Жумар МАНАРАГА',
          description:"Зажим для одинарной веревки. Имеет удобную ручку для руки. Используется для подъемов и в качестве стопора иных элементов",
          price: 2500,
          img: 'https://avatars.mds.yandex.net/i?id=174c81ffa2aa91c5fded586ac61579db234a68d0-5221012-images-thumbs&n=13',
        },
        {
          id: 5,
          type: 'Спусковые',
          name: 'Спусковое устройство "RIG Petzl"',
          description:"Спусковое устройство используется для спуска альпиниста. Может использоваться в качестве страховочного устройства или полиспастов",
          price: 18500,
          img: 'https://otmir.ru/upload/iblock/af4/vcuns2rml9c39y5p18zp59j9ernhoml9.jpg',
        },
        {
          id: 6,
          type: 'Каски',
          name: 'Каска Delta Plus',
          description:"Каска для промальпа. Имеет дополнительное ребро жесткости в отличии от спортивных касок",
          price: 2300,
          img: 'https://www.deloks.ru/upload/iblock/e88/793gstj1ae73bt700wx8ik208x7ee3nt/kaska_delta_plus_granite_wind_sinyaya_1_full.jpg',
        },
        {
          id: 7,
          type: 'Обвязки',
          name: 'Привязь Singing Rock ProfiWalker',
          description:"Комфортная привязь для промальпа. Комфортная привязь для промальпа. Увеличенный кушак и ремни, что обеспечивает комфортную работу",
          price: 22000,
          img: 'https://yandex-images.clstorage.net/S5KE3f184/67382fA1e/E9hTrJfV_9ZV43MR5u4feO_BVHqnG5OHa5QNfGuyh5KouFanDlkLqjakSY3KF5cpqQhPMAC1YfK3wi94DfgFM0LZCrnC1IbKVfciPc_ed0ivlGQPq06b43uJaU0yEmMfeWX_Qqegwl_O1RTgv0KuGKQJ_oRB4eFbN3qjTPUp4OaHEA_Eu5lSvilTWjHKXq_Ut0hUClPOk6on0PhYpjqvwxlN57arOFZb2o3wwJMyG5AMGdpBEWk526-ul-hR5fxqN7w_NJd1AgapY44tzqJvsMMQIEoPxjeSV2TMjGq-t9ed8U9GexA2t6qhTNx_gos0RMlS4YFF5dfX0tPcrZ2cQj8QE_TTuVqOfT8CJQYKY8hX9DAqE-Y_GseIJEg2DsvTzWlLIq-AVudCUQS8i44P4MRJBmXxmaGX63aLbEVRdEpzPG8sRwG6hqXnrglGSnc4P5QodpsWY0LDoFQYOs4TK7FxC9aLNPZ_fn0kxJey78QsycLd7eXVW3eep6BFEfzeM1iLTLMNjuohV_ZhKgJjbH-khBI_loc-0-jI3NJOV7tZfcc-ByBC23ptvDC_vhO4iAWaPeV1TXOjeu9o6d1QvtsY-2DXoVpOuVvaHTpam9RfBPxOq-ozji_YIJwiQnvLQWHPyquoNq-iPXhMq16v6MQZ1q0l8UW73w4rlO0N-IKLuNPMhw2C_sWTHiEmKivka-B4Fv9qO7rTYMCA0srfB6kNvxYL2IIjIolYgKMylzigzS5lxb0R01uaj5z1FXw2D9BbVI8J5op9d27ljq43MKu4QEY7akcmL3wYQLL2m891QYvqe2wOO74trMw3-vso_H2mkX2tucfvfnvAOXGIwgvkz-wjvVYq_W-GQb6m_7RzRMSCP6qzniugJIBWaocrmWELGuc0_m_ijbDoFwbDuHBBMs3JVeF_24bz_BnBLIJbJON0j1HyDlHrrpGqojPgLwDwxvfutxID7MCgtuZI',
        },
        {
          id: 8,
          type: 'Карабины',
          name: "Карабин МАНАРАГА",
          description: "Карабин с байнентной муфтой имеет увеличенный размер, что позволяет увеличить количество пристегиваемых елементов",
          price: 1300,
          img: 'https://avatars.mds.yandex.net/get-mpic/12300570/2a0000018eefc69a3c2831e6e5b3effdda24/orig',
        },
        {
          id: 9,
          type: 'Веревка',
          name: "Веревка Fortis",
          description: "Свойство - статика, состав - полиэфир. Особенность веревки - сохранение прочности, мягкости на протяжении многих лет",
          price: 75,
          img: 'https://sizcontract.ru/upload/iblock/d1a/eu0bi5zw4zsz5h3fgbkc6u0cysgf5co8/veryevka_staticheskaya_fortis_11_mm_azotkhimfortis_100_m.jpg',
        },
        {
          id: 10,
          type: 'Зажимы',
          name: 'Жумар VENTO',
          description: "Зажим для одинарной веревки. Имеет увеличенный разъем снизу, улучшенную ручку по сравнению с предыдущей версией",
          price: 3500,
          img: 'https://avatars.mds.yandex.net/i?id=ca01f487f79ff05cdae588031873ebe8_l-5348290-images-thumbs&n=13',
        },
        {
          id: 11,
          type: 'Усы и петли',
          name: 'Станционная петля VENTO',
          description: "Станционная петля предназначена для организации точки опоры для наведения перил, страховки и пр.",
          price: 800,
          img: 'https://avatars.mds.yandex.net/i?id=a498605b089b54c9ffef7c9a5f078d84_l-5029416-images-thumbs&n=13',
        },
        {
          id: 12,
          type: 'Усы и петли',
          name: 'Ус самостраховки VENTO',
          description: "Подходит в качестве короткого уса для самостраховки человека. Благодаря встроенной резинки, ус временно укорачивается в длине",
          price: 1200,
          img: 'https://www.kant.ru/upload/iblock/c07/c0774035db6e51e60e269e2ea58d7e1b.jpg',
        },
        {
          id: 13,
          type: 'Карабины',
          name: "Карабин VENTO Helium",
          description: "Карабин с закручивающейся муфтой не позволяет привести в произвольное открытие карабина",
          price: 1200,
          img: 'https://avatars.mds.yandex.net/i?id=c2330fb2257864b5d92cdc290dce5be67a7887fa-7149282-images-thumbs&n=13',
        },
      ]

      products.forEach(product => {
        insert.run(product.name, product.type, product.img, product.description, product.price);
      });

      insert.finalize();
    }
  });


});

// Роут для добавления товара в корзину
// router.post('/add', (req, res) => {
//   const { productId, quantity } = req.body;
//   // Пример обработки запроса на добавление товара в корзину
//   db.run('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [productId, quantity], function(err) {
//     if (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     res.json({ message: 'Product added to cart successfully', cartItemId: this.lastID });
//   });
// });
//
// // Роут для редактирования товара в корзине
// router.put('/:id', (req, res) => {
//   const cartItemId = req.params.id;
//   const { quantity } = req.body;
//   // Пример обработки запроса на редактирование товара в корзине
//   db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartItemId], function(err) {
//     if (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     res.json({ message: `Cart item ${cartItemId} updated successfully` });
//   });
// });


// Закрываем соединение с базой данных
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Соединение с базой данных закрыто.');
// });

module.exports = db;