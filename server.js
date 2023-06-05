const express = require('express');
const { MongoClient } = require('mongodb');
const estudiantesRouter = require('./routes/estudiantes');
const docentesRouter = require('./routes/docentes');

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

  app.use(express.json());

  app.use('/estudiantes', estudiantesRouter(db));
  app.use('/docentes', docentesRouter(db));

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