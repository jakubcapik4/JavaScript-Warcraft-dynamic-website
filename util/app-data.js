const pool = require('../data/database');
const bcrypt = require('bcryptjs');

const getSubscriptionData = async () => {
    const [rows] = await pool.query('SELECT * FROM career_portal.subscriptions ORDER BY name ASC');
    return rows;
};

const getJobsData = async () => {
    const [rows] = await pool.query('SELECT * FROM career_portal.jobs');
    return rows;
};

const getReviewForRestaurants = async (id) => {
    const query = `SELECT * FROM reviews WHERE rest_id = ?`;
    const [records] = await pool.query(query, [id]);
    return records;
};

const saveSubscriptionData = async (newSubscription) => {
    const { name, email, phone } = newSubscription;
    await pool.query(
        'INSERT INTO career_portal.subscriptions (name, email, phone) VALUES (?, ?, ?)',
        [name, email, phone]
    );
};

const createUser = async (values) => {
    const query = `INSERT INTO users (name, password, email, phone, address, country, salt) VALUES (?)`;
    const [result] = await pool.query(query, [values]);
    return result;
};

const getUserBy = async (col, value) => {
    const query = `SELECT * FROM users WHERE ${col} = ?`;
    const [records] = await pool.query(query, [value]);
    return records;
};

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM career_portal.users');
  return rows;
};

// Database setup: ensure schema and seed data
const ensureSchemaAndSeeds = async () => {
  await pool.query('USE career_portal');

  // Create tables if they don't exist
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
       user_id INT NOT NULL AUTO_INCREMENT,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password VARCHAR(255) NOT NULL,
       phone VARCHAR(255),
       address VARCHAR(255),
       country VARCHAR(255),
       salt VARCHAR(255) NOT NULL,
       isAdmin TINYINT DEFAULT 0,
       PRIMARY KEY(user_id)
     )`,
    `CREATE TABLE IF NOT EXISTS subscriptions (
       subscription_id INT NOT NULL AUTO_INCREMENT,
       name VARCHAR(255),
       email VARCHAR(255),
       phone VARCHAR(255),
       PRIMARY KEY(subscription_id)
     )`,
    `CREATE TABLE IF NOT EXISTS jobs (
       id INT NOT NULL AUTO_INCREMENT,
       name VARCHAR(255),
       description TEXT,
       salary VARCHAR(255),
       website VARCHAR(255),
       PRIMARY KEY(id)
     )`,
    `CREATE TABLE IF NOT EXISTS reviews (
       review_id INT NOT NULL AUTO_INCREMENT,
       rating INT,
       text VARCHAR(1024),
       date DATETIME DEFAULT CURRENT_TIMESTAMP,
       rest_id INT,
       user_id INT,
       PRIMARY KEY(review_id)
     )`
  ];

  for (const sql of tables) {
    await pool.query(sql);
  }

  // Add missing columns if table existed without them
  const alters = [
    `ALTER TABLE users ADD COLUMN phone VARCHAR(255)`,
    `ALTER TABLE users ADD COLUMN address VARCHAR(255)`,
    `ALTER TABLE users ADD COLUMN country VARCHAR(255)`,
    `ALTER TABLE users ADD COLUMN isAdmin TINYINT DEFAULT 0`
  ];
  for (const sql of alters) {
    try { await pool.query(sql); } catch {};
  }

  // Seed admin user if none exists
  const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM users');
  if (countRows[0].count === 0) {
    const hash = bcrypt.hashSync('adminpass', 12);   // password: adminpass
    await pool.query(
      `INSERT INTO users (name, email, password, phone, address, country, salt, isAdmin)
       VALUES ('Admin', 'admin@example.com', ?, '', '', '', '', 1)`,
      [hash]
    );
  }
};

module.exports = {
    getSubscriptionData,
    getJobsData,
    getReviewForRestaurants,
    saveSubscriptionData,
    createUser,
    getUserBy,
    getAllUsers,
    ensureSchemaAndSeeds
};
