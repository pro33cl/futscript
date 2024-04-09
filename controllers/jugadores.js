// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {teamplayerModels} from '../db/consultas.js';

// ----------------------------------------------------------
// FUNCION - obtenerJugadores
// ----------------------------------------------------------

const obtenerJugadores = async (req, res) => {

    try{

        console.log(`playerController.obtenerJugadores: Start`);
        const { teamID } = await req.params;
        let jugadores;

        if(teamID){

            jugadores = await teamplayerModels.getPlayers(teamID);
            
            if(!jugadores){


                console.log(`playerController.obtenerJugadores: Jugadores not found`);
                return res.status(404).json({message:"Jugadores not found", result: null});
            }
            else{
    
                console.log(`playerController.obtenerJugadores: Success`);
                return res.status(200).json({message:"Success", result: jugadores});
            }
        }
        else{

            console.log(`playerController.obtenerJugadores: team id is required`);
            return res.status(404).json({message:"team id is required", result: null});
        }
    }
    catch(error){

        
        if(error.code == 404){

            console.log(`playerController.obtenerJugadores: ${error.message}`);
            return res.status(404).json({message: error.message, result: null});
        }
        else{

            console.log(`playerController.obtenerJugadores: Internal server error`);
            return res.status(500).json({message: "Internal server error", result: error}); 
        }
    }
    finally{

        console.log(`playerController.obtenerJugadores: End`);
    } 
}

// ----------------------------------------------------------
// FUNCION - registrarJugador
// ----------------------------------------------------------

const registrarJugador = async (req, res) => {

    try{
        
        console.log(`playerController.registrarJugador: Start`);
        const {teamID} = req.params;
        const jugador = req.body;

        if(!jugador || !teamID){

            console.log(`playerController.registrarJugador: Data is required`);
            return res.status(400).json({message:"Data is required", result: null});
        }
        else if(!jugador.name || !jugador.position){
    
            console.log(`playerController.registrarJugador: Every jugador data is required`);
            return res.status(400).json({message:"Every jugador data is required", result: null});
        }
        else{

            const posted = await teamplayerModels.addPlayer({ jugador, teamID });
            console.log(`playerController.registrarJugador: Posted`);
            return res.status(201).json({message:"Posted", result: posted});
        }  
    }
    catch(error){

        if(error.code == 404){

            console.log(`playerController.registrarJugador: ${error.message}`);
            return res.status(404).json({message: error.message, result: null});
        }
        else{

            console.log(`playerController.registrarJugador: Internal server error`);
            return res.status(500).json({message: "Internal server error", result: error});
        }
    }
    finally{

        console.log(`playerController.registrarJugador: End`);
    } 
}

export const playerController = { obtenerJugadores, registrarJugador };