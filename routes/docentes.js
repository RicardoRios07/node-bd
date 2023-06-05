const express = require('express');
const { ObjectId } = require('mongodb');

function createDocentesRouter(db) {
  const router = express.Router();
  const docentesCollection = db.collection('docentes');

  router.post('/', async (req, res) => {
    const nuevoDocente = req.body;
    const resultado = await docentesCollection.insertOne(nuevoDocente);
    res.json(resultado);
  });

  router.get('/', async (req, res) => {
    const docentes = await docentesCollection.find().toArray();
    res.json(docentes);
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const docente = await docentesCollection.findOne({ _id: ObjectId(id) });
    res.json(docente);
  });

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    const resultado = await docentesCollection.updateOne({ _id: ObjectId(id) }, { $set: datosActualizados });
    res.json(resultado);
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await docentesCollection.deleteOne({ _id: ObjectId(id) });
    res.json(resultado);
  });

  return router;
}

module.exports = createDocentesRouter;