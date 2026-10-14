const User = require("../models/user.model");

const getSignUp = async (req, res) => {
  let inputData = req.session.inputData;
  if (!inputData) {
    inputData = { name: "", email: "", password: "", passwordRepeat: "" };
  }
  req.session.inputData = null;
  res.render("public/signup", { inputData });
};

const signUp = async (req, res) => {
  const { name, email, password, passwordRepeat } = req.body;
  const inputData = {
    ...req.body,
  };

  if (
    passwordRepeat !== password ||
    password.trim().length < 8 ||
    !email.includes("@")
  ) {
    inputData.errorMessage = "Invalid input data";
  }
  const user = new User({ name, email, password }); //await dbHandler.getUserBy("email", email);
  if (await user.existsAlready()) {
    inputData.errorMessage = "Email is in use";
  }
  if (inputData.errorMessage) {
    req.session.inputData = inputData;
    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }
  try {
    await user.signup();
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    return res.status(500).render("shared/500");
  }
};

const getLogin = (req, res) => {
  let inputData = req.session.inputData;
  if (!inputData) {
    inputData = { email: "", password: "" };
  }
  req.session.inputData = null;
  res.render("public/login", { inputData });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const inputData = {
    ...req.body,
  };

  try {
    const user = new User({ email, password }); //await dbHandler.getUserBy("email", email);
    const existingUser = await user.getUserWithSameEmail();
    if (!existingUser) {
      inputData.errorMessage = "Invalid cretentials";
      req.session.inputData = inputData;
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
    const success = user.login(existingUser.password, existingUser.salt);
    if (success) {
      req.session.user = {
        id: existingUser.user_id,
        email: existingUser.email,
        name: existingUser.name,
      };
      req.session.isAdmin = existingUser.isAdmin === 1;
      req.session.save(() => {
        res.redirect("/restaurants");
      });
    } else {
      inputData.errorMessage = "Invalid cretentials";
      req.session.inputData = inputData;
      req.session.save(() => {
        res.redirect("/login");
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).render("shared/500");
  }
};

const logout = (req, res) => {
  req.session.user = null;
  req.session.save(() => {
    res.redirect("/");
  });
};

module.exports = {
  getSignUp,
  signUp,
  getLogin,
  login,
  logout,
};
