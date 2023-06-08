const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  especialidad: {
    type: String,
    required: true
  },
});

const Docente = mongoose.model('Docente', docenteSchema);

module.exports = Docente;