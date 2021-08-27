const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { auth } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//AUTENTICACION
router.get('/auth', auth, async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    mail: req.user.mail,
  });
});

//GET TODOS LOS USUARIOS
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//GETBYID
router.get('/:id', async (req, res) => {
  const users = await User.findById(req.params.id);
  res.json(users);
});

//POST-LOGIN
router.post('/login', async (req, res) => {
  await User.findOne({ mail: req.body.mail }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucces: false,
        message: 'Auth failed, email not found',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

//POST-REGISTRO
router.post('/register', async (req, res) => {
  const { name, mail, password } = req.body;
  const user = new User({ name, mail, password });

  try {
    await user.save();
    res.json({ mensaje: 'Usuario creado' });
  } catch (error) {
    res.status(400);
    res.json({ error: `${error}` });
  }
});

//PUT
router.put('/:id', async (req, res) => {
  let { mail, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return next(err);
      password = hash;
      const newUser = { mail, password };
      await User.findByIdAndUpdate(req.params.id, newUser);
      res.json({ mensaje: `Updated Password ${password}` });
    });
  });
});

//DELETE
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
});

//LOGOUT
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
