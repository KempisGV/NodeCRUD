const express = require('express');
const router = express.Router();
const User = require('../models/user');

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

//POST
router.post('/', async (req, res) => {
  const { nombre, correo, password } = req.body;
  const user = new User({ nombre, correo, password });
  await user.save();
  res.json({ mensaje: 'Usuario creado' });
});

//PUT
router.put('/:id', async (req, res) => {
  const { correo, password } = req.body;
  const newUser = { correo, password };
  await User.findByIdAndUpdate(req.params.id, newUser);
  res.json({ mensaje: 'Usuario actualizado' });
});

//DELETE
router.put('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;
