const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017/bd-prueba';
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conectado a la base de datos.');
  const db = client.db();
  const estudiantesCollection = db.collection('estudiantes');
  const docentesCollection = db.collection('docentes');

  const camposEstudiantes = {
    nombre: 'string',
    edad: 'number',
    carrera: 'string',
    promedio: 'number',
    direccion: 'string'
  };

  const camposDocentes = {
    nombre: 'string',
    edad: 'number',
    materia: 'string',
    experiencia: 'number',
    correo: 'string'
  };


  app.post('/estudiantes', async (req, res) => {
    const nuevoEstudiante = req.body;
    const resultado = await estudiantesCollection.insertOne(nuevoEstudiante);
    res.json(resultado);
  });

  app.get('/estudiantes', async (req, res) => {
    const estudiantes = await estudiantesCollection.find().toArray();
    res.json(estudiantes);
  });

  app.get('/estudiantes/:id', async (req, res) => {
    const id = req.params.id;
    const estudiante = await estudiantesCollection.findOne({ _id: ObjectId(id) });
    res.json(estudiante);
  });

  app.put('/estudiantes/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    const resultado = await estudiantesCollection.updateOne({ _id: ObjectId(id) }, { $set: datosActualizados });
    res.json(resultado);
  });

  app.delete('/estudiantes/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await estudiantesCollection.deleteOne({ _id: ObjectId(id) });
    res.json(resultado);
  });



  app.post('/docentes', async (req, res) => {
    const nuevoDocente = req.body;
    const resultado = await docentesCollection.insertOne(nuevoDocente);
    res.json(resultado);
  });

  app.get('/docentes', async (req, res) => {
    const docentes = await docentesCollection.find().toArray();
    res.json(docentes);
  });

  app.get('/docentes/:id', async (req, res) => {
    const id = req.params.id;
    const docente = await docentesCollection.findOne({ _id: ObjectId(id) });
    res.json(docente);
  });

  app.put('/docentes/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    const resultado = await docentesCollection.updateOne({ _id: ObjectId(id) }, { $set: datosActualizados });
    res.json(resultado);
  });

  app.delete('/docentes/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await docentesCollection.deleteOne({ _id: ObjectId(id) });
    res.json(resultado);
  });

  
  const server = app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });

  server.on('error', (error) => {
    console.error('Error al iniciar el servidor:', error);
  });

  setTimeout(() => {
    if (!server.listening) {
      console.error('Tiempo de espera agotado. No se pudo iniciar el servidor.');
      process.exit(1);
    }
  }, 5000);
});