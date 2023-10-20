import express from 'express';
import { db } from '../db';
import { databaseFileToTournamentParser } from '../helpers/tournamenthelper';


export const tournamentRoute = express.Router();

tournamentRoute.use(express.urlencoded({ extended: true }));
tournamentRoute.use(express.static('../data'));

tournamentRoute.get('/', async (req, res) => {   
        let idFromQuery = req.query.code;
        let query = `SELECT * FROM tournament WHERE tournamentid = ${idFromQuery}`;
        console.log(query)
        try {
            const result = await db.query(query, []);
            let tournament = result["rows"][0]
            console.log(tournament)
            let parsedTournament = databaseFileToTournamentParser(tournament);
            console.log(parsedTournament)
            res.render('tournament', { username: (req.oidc.user?.name), tournamentName : parsedTournament.competitionName, rounds : parsedTournament.rounds});
        }
        catch (e) {
            console.log(e);
            res.render('tournament-na', { username: (req.oidc.user?.name) });
        }
       
    }
);

    
