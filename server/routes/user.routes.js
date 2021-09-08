const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { auth } = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const saltRounds = 10;

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

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
router.post('/login', (req, res) => {
  // Form validation
  const { isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json();
  }
  const mail = req.body.mail;
  const password = req.body.password;
  // Find user by email
  User.findOne({ mail }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ mailnotfound: 'Mail not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
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
      res.json({ mensaje: 'The password was updated' });
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
