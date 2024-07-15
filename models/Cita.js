const mongoose = require('mongoose');

const citaSchema = mongoose.Schema({

    entidad:{
        type: String,
        required: true
    },

    especialidad:{
        type: String,
        required: true
    },

    sede:{
        type: String,
        required: true
    },

    costo:{
        type: Number,
        required: true
    },

    hora:{
        type: String,
        required: true
    },
    
    fecha:{
        type: Date,
        default: Date.now()
    }

},{versionkey: false})

module.exports = mongoose.model('Cita', citaSchema);