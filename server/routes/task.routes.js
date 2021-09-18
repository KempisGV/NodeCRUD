const express = require('express');
const router = express.Router();
const Task = require('../models/task');

//GET TODAS LAS TAREAS
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
//Change status
router.get('/change/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  console.log(task)
  await task.save();
});
//GET TASKS OF A USER
router.get('/:id', async (req, res) => {
  const tasks = await Task.find({ _userId: req.params.id });
  res.json(tasks);
});

//GET TASK BY ITS ID
router.get('/details/:id', async (req, res) => {
  const tasks = await Task.findById(req.params.id );
  res.json(tasks);
});
//POST
router.post('/create', async (req, res) => {
  const { _userId, name, description, status } = req.body;
  const task = new Task({ _userId, name, description, status });

  try {
    await task.save();
    await res.json({ mensaje: 'Tarea creada' });
  } catch (error) {
    res.status(400);
    res.json({ error: `${error}` });
  }
});

//PUT
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const newTask = { name, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ mensaje: 'Tarea actualizada' });
});

//DELETE
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Tarea eliminada' });
});
module.exports = router;
