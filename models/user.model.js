const crypto = require("crypto");

const pool = require("../data/database");
const Base = require("./base.model");

class User extends Base {
  async getUserWithSameEmail() {
    const query = `
  select * from users where email = ?
  `;
    const [records] = await pool.query(query, [this.email]);
    if (records.length === 0) {
      return null;
    }
    return records[0];
  }

  static async fetchAll() {
    const query = "select * from users";
    const [records] = await pool.query(query);
    return records;
  }

  static async findById(id) {
    const query = "select * from users where user_id = ?";
    const [records] = await pool.query(query, [id]);
    if (records.length === 0) {
      return null;
    }
    return new User(records[0]);
  }

  static async delete(id) {
    const query = "delete from users where user_id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
  }

  static async getByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}


  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }
  async update() {
    const query = `
    UPDATE users set name = ?, email = ?
    WHERE user_id = ?
    `;
    await pool.query(query, [this.name, this.email, this.user_id]);
  }

  async signup() {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(this.password.trim(), salt, 1000, 64, "sha512")
      .toString("hex");
    const query = `
      INSERT INTO users (name, email, password, salt) VALUES (?)
      `;
    const [result] = await db.query(query, [
      [this.name.trim(), this.email.trim(), hashedPassword, salt],
    ]);
    return result;
  }

  login(comparePassword, salt) {
    const hash_pwd = crypto
      .pbkdf2Sync(this.password, salt, 1000, 64, "sha512")
      .toString("hex");
    return comparePassword === hash_pwd;
  }
}

module.exports = User;
