const express = require('express');
const mongoose = require('mongoose');
const docentesRouter = require('./routes/docentesRoutes');
const estudiantesRouter = require('./routes/estudiantesRoutes');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});

app.use(express.json());
app.use('/docentes', docentesRouter);
app.use('/estudiantes', estudiantesRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
