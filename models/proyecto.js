const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let proyectoSchema = new Schema({
    titulo: String,
    descripcion: String,
    url: String,
    cliente: String,
    urlCliente: String
});

module.exports = mongoose.model('Proyecto', proyectoSchema);