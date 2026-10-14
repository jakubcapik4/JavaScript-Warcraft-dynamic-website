// seedAdmin.js
const pool   = require('./data/database');   // tvoja cesta k poolu
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    // 1) Vygenerujeme nový hash pre heslo 'adminpass'
    const plainPassword = 'adminpass';
    const hash = bcrypt.hashSync(plainPassword, 12);
    console.log('Generated bcrypt hash:', hash);

    // 2) V DB najprv nastavíme, že id=1 je Admin
    //    (predpokladáme, že record už existuje s user_id=1)
    const sql = `
      UPDATE users
         SET name     = ?,
             email    = ?,
             password = ?,
             isAdmin  = 1
       WHERE user_id = 1
    `;
    const params = [
      'Admin',               // meno
      'admin@example.com',   // email
      hash                   // práve vygenerovaný hash
    ];

    const [result] = await pool.query(sql, params);
    if (result.affectedRows === 0) {
      console.warn('Žiadny riadok nebol aktualizovaný – skontroluj, či máš v users user_id=1');
    } else {
      console.log('✔️  Admin (user_id=1) bol úspešne seed-nutý s novým heslom.');
    }

    // 3) Ukončíme pool a konči script
    await pool.end();
    process.exit(0);

  } catch (err) {
    console.error('Chyba pri seeding Admina:', err);
    process.exit(1);
  }
}

seedAdmin();
