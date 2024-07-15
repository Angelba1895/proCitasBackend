const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//Llamamos a nuestra funcion conectarBD
conectarBD();
app.use(cors());

//Habilitamos express.json
app.use(express.json({extended:true}));

//Rutas aplicación
app.use('/api/citas',require('../routes/citasRuta'));
app.use('/api/pacientes',require('../routes/pacienteRuta'));
app.use('/api/doctores',require('../routes/doctorRuta'));
app.use('/api/auth', require('../routes/auth'));
app.use('/api/usuarios',require('../routes/usuarios'));

//Rutas de prueba y configuración
app.get('/', (req, res) =>{
    res.send('Bienvenidos, estamos desde el navegador');
});

app.listen(port,()=> console.log('Estamos conectados por el servidor con el puerto:', port));