const express = require('express');
const Estudiante = require('../schemas/estudianteSchema');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const estudiante = await Estudiante.findById(id);
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});

router.post('/', async (req, res) => {
  const nuevoEstudiante = req.body;
  try {
    const estudiante = await Estudiante.create(nuevoEstudiante);
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const estudiante = await Estudiante.findByIdAndDelete(id);
    if (estudiante) {
      res.json({ message: 'Estudiante eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});

module.exports = router;