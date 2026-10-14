const express = require('express');
const {
  getLogin, postLogin,
  getUsers, getSingleUser,
  updateUser, deleteUser
} = require('../controllers/admin.controller');
const router = express.Router();

// 1) Login (verejné)
router.get('/login',  getLogin);
router.post('/login', postLogin);

// 2) Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/admin/login');
  });
});

// 3) Authentication middleware
router.use((req, res, next) => {
  if (!req.session.user?.isAdmin) {
    return res.redirect('/admin/login');
  }
  next();
});

// 4) Zabezpečené admin routy
router.get('/users',         getUsers);
router.get('/user/:id/edit', getSingleUser);
router.post('/user/:id/edit', updateUser);
router.delete('/user/:id/delete', deleteUser);

module.exports = router;
