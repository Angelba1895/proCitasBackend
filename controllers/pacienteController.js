const Paciente = require('../models/Paciente');

//Funcion agregar pacientes
exports.agregarPacientes = async(req, res) => {

    try {
        
        let pacientes
        pacientes = new Paciente(req.body);
        await pacientes.save();
        res.send(pacientes);    

    } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error al agregar un paciente'); 
    }

}

//Crear una funcion que nos va a mostrar todos los pacientes
exports.mostrarPacientes = async(req, res) => {

    try {

        const pacientes = await Paciente.find();
        res.json(pacientes);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar los pacientes');        
    }
}

//Funcion para mostrar un paciente
exports.buscarPaciente = async(req, res) => {

    try {

        const paciente = await Paciente.findById(req.params.id);

        if(!paciente){
            res.status(404).json({msg: 'No se encuentra el paciente'});
        }else{
            res.json(paciente);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar el paciente');        
    }
}

//Funcion para actualizar un paciente
exports.actualizarPacientes = async(req, res) => {
    try {
        const paciente = await Paciente.findOneAndUpdate(
            {_id: req.params.id},req.body);
        
        if(!paciente) res.status(404).send("Paciente no encontrado");
        else
        res.json(paciente);    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el paciente');
    }
};

//Funcion para modificar un paciente
exports.modificarPacientes = async(req, res) => {
    
    try{
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!cliente){
            return res.status(404).send('Paciente no encontrado');
    }
    res.json(cliente)
    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el paciente') ;
    }
}


//Funcion para eliminar un paciente
exports.eliminarPacientes = async(req, res) =>{
    try {
        let pacientes = await Paciente.findById(req.params.id);
        if(!pacientes){
            res.status(404).send('Paciente no encontrado');
        }else{
            await Paciente.findOneAndDelete({_id: req.params.id});
            res.json({msg: 'El paciente ha sido eliminado'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el paciente') ;
    }
}

