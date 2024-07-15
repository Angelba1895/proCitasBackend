const Cita = require('../models/Cita');

//Funcion agregar citas
exports.agregarCitas = async(req,res)=>{
    try {
        let citas = new Cita(req.body);
        await citas.save();
        res.send({citas});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al agregar una cita'});
    }
}
//Funcion mostrar citas
exports.mostrarCitas = async(req,res)=>{
    try {
        const citas = await Cita.find();
        res.json({citas});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al mostrar las citas'});
    }
}

//Funcion para mostrar una citae
exports.buscarCita = async(req, res) => {

    try {

        const cita = await Cita.findById(req.params.id);

        if(!cita){
            res.status(404).json({msg: 'No se encuentra la cita'});
        }else{
            res.json(cita);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar la cita');        
    }
}


//Funcion actualizar citas
exports.actualizarCitas = async(req, res) =>{
    try {
        const citas = await Cita.findOneAndUpdate(
            {_id: req.params.id,}, req.body);
            if(!citas){ 
                res.status(404).json({msg: "Cita no encontrada"});
            }else{
                res.json({citas});
            }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al actualizar la cita'});
    }
}

//Funcion eliminar una cita
exports.eliminarCitas = async(req, res) =>{
    try {
        let citas = await Cita.findById(req.params.id);
        if(!citas){
            res.status(404).send('Cita no encontrada');
        }else{
            await Cita.findOneAndDelete({_id: req.params.id});
            res.json({msg: 'La cita ha sido eliminada'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la cita') ;
    }
}