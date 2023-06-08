const express = require('express');
const Docente = require('../schemas/docenteSchema');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const docentes = await Docente.find();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los docentes' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const docente = await Docente.findById(id);
    if (docente) {
      res.json(docente);
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el docente' });
  }
});

router.post('/', async (req, res) => {
  const nuevoDocente = req.body;
  try {
    const docente = await Docente.create(nuevoDocente);
    res.json(docente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el docente' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const docente = await Docente.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (docente) {
      res.json(docente);
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el docente' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const docente = await Docente.findByIdAndDelete(id);
    if (docente) {
      res.json({ message: 'Docente eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el docente' });
  }
});

module.exports = router;