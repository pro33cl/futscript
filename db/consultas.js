// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import pkg from 'pg';
import format from "pg-format";
import "dotenv/config";

// ----------------------------------------------------------
// DECLARACION DE VARIABLES E INSTANCIANDO OBJETOS
// ----------------------------------------------------------

const {Pool} = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    allowExitOnIdle: true
});

// ----------------------------------------------------------
// FUNCION - test
// ----------------------------------------------------------

const test = async function (){
    try {
        await pool.query("SELECT NOW()");
        console.log("Database test connection: Database connected");
    } catch (error) {
        console.log("Error: Database not connected");
        console.error(error);
    }
}

test();

// ----------------------------------------------------------
// FUNCION - getTeams
// ----------------------------------------------------------

const getTeams = async () => {

    console.log(`teamplayerModels.getTeams: Start`);

    const query = 'SELECT * FROM equipos ORDER BY id ASC';
    const formattedQuery = format(query);
    const {rows, rowCount} = await pool.query(formattedQuery);

    console.log(`teamplayerModels.getTeams: End`);
    
    if(rowCount <= 0){

        let error = new Error("Data not found");
        error.code = 404;
        throw error;
    }
    else{

        return rows;
    }
}

// ----------------------------------------------------------
// FUNCION - getPlayers
// ----------------------------------------------------------

const getPlayers = async (teamID) => {

    console.log(`teamplayerModels.getPlayers: Start`);
    
    const query = `SELECT jugadores.id, jugadores.name, equipos.name AS team, posiciones.name AS position 
	                    FROM jugadores 
	                    LEFT JOIN equipos
	                    ON jugadores.id_equipo = equipos.id
		                    LEFT JOIN posiciones
		                    ON jugadores.position = posiciones.id
	                    WHERE equipos.id = %s
	                    ORDER BY jugadores.id ASC`;

    const formattedQuery = format(query, teamID);
    const {rows, rowCount} = await pool.query(formattedQuery);

    console.log(`teamplayerModels.getPlayers: End`);

    if(rowCount <= 0){

        let error = new Error("Data not found");
        error.code = 404;
        throw error;
    }
    else{

        return rows;
    }
}

// ----------------------------------------------------------
// FUNCION - addTeam
// ----------------------------------------------------------

const addTeam = async (equipo) => {

    console.log(`teamplayerModels.addTeam: Start`);

    const query = "INSERT INTO equipos (id, name) VALUES (DEFAULT, '%s') RETURNING *";
    const formattedQuery = format(query, equipo);
    const {rows, rowCount} = await pool.query(formattedQuery);

    console.log(`teamplayerModels.addTeam: End`);

    if(rowCount <= 0){

        let error = new Error("Data not found");
        error.code = 404;
        throw error;
    }
    else{

        return rows[0];
    }  
}

// ----------------------------------------------------------
// FUNCION - addPlayer
// ----------------------------------------------------------

const addPlayer = async ({ jugador, teamID }) => {

    console.log(`teamplayerModels.addPlayer: Start`);

    const {name, position} = jugador;
    const query = "INSERT INTO jugadores (id, id_equipo, name, position) VALUES (DEFAULT, %s, '%s',%s) RETURNING *";
    const formattedQuery = format(query, teamID, name, position);
    const {rows, rowCount} = await pool.query(formattedQuery);

    console.log(`teamplayerModels.addPlayer: End`);

    if(rowCount <= 0){

        let error = new Error("Data not found");
        error.code = 404;
        throw error;
    }
    else{

        return rows[0];
    } 
}

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const teamplayerModels = {getTeams, addTeam, getPlayers, addPlayer };
