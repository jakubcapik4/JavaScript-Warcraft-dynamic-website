class Base {
  constructor(data, id) {
    for (const key in data) {
      this[key] = data[key];
    }
    if (id) {
      this.id = id;
    }
  }
}

module.exports = Base;
