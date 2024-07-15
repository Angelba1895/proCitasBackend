const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {
    //Vamos a revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body;

    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El correo ya existe'});
        }

        //Creamos al usuario
        usuario = new Usuario(req.body);
        usuario.password = await bcryptjs.hash(password,10)

        //Guardar el usuario en la base de datos
        await usuario.save();

        //Firmar el JWT
        const payload = {
            usuario: {id: usuario.id},
        };

        jwt.sign(
            payload, process.env.SECRETA, 
            {
                expiresIn: 3600, //1 Hora
            },
            (error, token) => {
                if(error) throw error;

                //Mensaje de confirmación
                res.json({token});
            }
        );

    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send('Hubo un error');
        
    }
}