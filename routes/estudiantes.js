const express = require('express');
const { ObjectId } = require('mongodb');

function createEstudiantesRouter(db) {
  const router = express.Router();
  const estudiantesCollection = db.collection('estudiantes');

  router.post('/', async (req, res) => {
    const nuevoEstudiante = req.body;
    const resultado = await estudiantesCollection.insertOne(nuevoEstudiante);
    res.json(resultado);
  });

  router.get('/', async (req, res) => {
    const estudiantes = await estudiantesCollection.find().toArray();
    res.json(estudiantes);
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const estudiante = await estudiantesCollection.findOne({ _id: ObjectId(id) });
    res.json(estudiante);
  });

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    const resultado = await estudiantesCollection.updateOne({ _id: ObjectId(id) }, { $set: datosActualizados });
    res.json(resultado);
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await estudiantesCollection.deleteOne({ _id: ObjectId(id) });
    res.json(resultado);
  });

  return router;
}

module.exports = createEstudiantesRouter;