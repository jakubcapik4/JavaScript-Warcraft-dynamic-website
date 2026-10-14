const User = require("../models/user.model");
const bcrypt = require("bcryptjs"); // nainštaluj: npm install bcryptjs

const getUsers = async (req, res) => {
  try {
    const users = await User.fetchAll();
    const head = [
      {
        id: "name",
        value: "Meno",
      },
      {
        id: "email",
        value: "Email",
      },
      {
        id: "action",
        value: "Akcie",
      },
    ];
    res.render("admin/users", {
      users: users.filter((item) => !item.isAdmin),
      head,
    });
  } catch (error) {
    console.log(error);
    res.render("shared/500");
  }
};
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("admin/userEdit", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);
    user.name = name;
    user.email = email;
    await user.update();
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.render("500");
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

// Zobrazenie prihlasovacieho formulára
const getLogin = (req, res) => {
  res.render("admin/login", { error: null });
};

// Spracovanie prihlásenia
const postLogin = async (req, res) => {
  const { email, password } = req.body;
// --- LOG pred načítaním používateľa ---
  console.log('login attempt for:', email);

  try {
    const userData = await User.getByEmail(email);
    // --- LOG načítaného záznamu ---
    console.log('fetched userData:', userData);
    if (!userData) {
      return res.status(401).render("admin/login", { error: "Nesprávny email alebo heslo" });
    }

    // --- LOG pred porovnaním hesla ---
    console.log('trying bcrypt.compare(', password, ', ', userData.password, ')');

    // porovnanie hashu
    const passwordsMatch = await bcrypt.compare(password, userData.password);

    // --- LOG výsledku porovnania ---
    console.log('passwordsMatch =', passwordsMatch);
    
    if (!passwordsMatch || userData.isAdmin !== 1) {
      return res.status(401).render("admin/login", { error: "Nesprávny email alebo heslo" });
    }

    // uloženie do session
    req.session.user = {
      user_id:  userData.user_id,
      name:     userData.name,
      email:    userData.email,
      isAdmin:  true
    };
    req.session.save(err => {
      if (err) console.error(err);
      res.redirect("/admin/users");
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("shared/500");
  }
};

module.exports = {
  getLogin,
  postLogin,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

