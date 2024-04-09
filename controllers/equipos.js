// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {teamplayerModels} from '../db/consultas.js';


// ----------------------------------------------------------
// FUNCION - obtenerEquipos
// ----------------------------------------------------------

const obtenerEquipos = async (req, res) => {
    
    try{

        console.log(`teamController.obtenerEquipos: Start`);
        const equipos = await teamplayerModels.getTeams();
        
        if(!equipos){

            console.log(`teamController.obtenerEquipos: Equipos not found`);
            return res.status(404).json({message:"Equipos not found", result: null});
        }
        else{

            console.log(`teamController.obtenerEquipos: Success`);
            return res.status(200).json({message:"Success", result: equipos});
        }
    }
    catch(error){

        if(error.code == 404){

            console.log(`teamController.obtenerEquipos: ${error.message}`);
            return res.status(404).json({message: error.message, result: null});
        }
        else{

            console.log(`teamController.obtenerEquipos: Internal server error`);    
            return res.status(500).json({message: "Internal server error", result: error}); 
        }   
    }
}

// ----------------------------------------------------------
// FUNCION - agregarEquipo
// ----------------------------------------------------------

const agregarEquipo = async (req, res) => {

    try{

        console.log(`teamController.agregarEquipos: Start`);
        const {equipo} = await req.body;

        if(equipo){

            const posted = await teamplayerModels.addTeam(equipo);
            console.log(`teamController.agregarEquipos: Posted`);
            return res.status(201).json({message:"Posted", result: posted});
        }
        else{

            console.log(`teamController.agregarEquipos: Data equipo is required`);
            return res.status(400).json({message:"Data equipo is required", result: null});
        }
    }
    catch(error){

        if(error.code == 404){

            console.log(`teamController.agregarEquipos: ${error.message}`);
            return res.status(404).json({message: error.message, result: null});
        }
        else{

            console.log(`teamController.agregarEquipos: Internal server error`);
            return res.status(500).json({message: "Internal server error", result: error}); 
        }  
    }
    finally{

        console.log(`teamController.agregarEquipos: End`);
    }
}

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const teamController = { obtenerEquipos, agregarEquipo };