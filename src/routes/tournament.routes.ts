import express, { query } from 'express';
import { db } from '../db';
import { Tournament, databaseFileToTournamentParser, matchesToTableElement } from '../helpers/tournamenthelper';
import { requiresAuth } from 'express-openid-connect';
import { body, validationResult } from 'express-validator';


export const tournamentRoute = express.Router();

tournamentRoute.use(express.urlencoded({ extended: true }));
tournamentRoute.use(express.static('../data'));

tournamentRoute.get('/', async (req, res) => {   
        let idFromQuery = req.query.code;
        let query = `SELECT * FROM tournament WHERE tournamentid = ${idFromQuery}`;
        try {
            const result = await db.query(query, []);
            let tournament = result["rows"][0]
            let parsedTournament = databaseFileToTournamentParser(tournament);
            if (req.oidc.user?.name == parsedTournament.tournamentCreator && req.oidc.user?.email == parsedTournament.tournamentCreatorEmail) {
                res.render('tournament', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture), tournamentName : parsedTournament.competitionName, rounds : parsedTournament.rounds, table : matchesToTableElement(parsedTournament.rounds, parsedTournament.competitors), tournamentid : parsedTournament.tournamentId, error:undefined, url : req.protocol + '://' + req.get('host') + req.originalUrl});
            }
            else {
                res.render('tournament-nonuser', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture), tournamentName : parsedTournament.competitionName, rounds : parsedTournament.rounds, table: matchesToTableElement(parsedTournament.rounds, parsedTournament.competitors) ,tournamentid : parsedTournament.tournamentId});
            }
        }
        catch (e) {
            console.log(e);
            res.render('tournament-na', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture) });
        }
    }
);

tournamentRoute.post('/', requiresAuth(), [
    // validation middleware: tournamentid, team1, team2, scoreteam1 and scoreteam2 
    // must be present in the request body
    body('tournamentid', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    body('team1', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    body('team2', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    body('scoreteam1', 'Rezultat kola ne smije biti prazan!').trim().isInt().toInt().escape(),
    body('scoreteam2', 'Rezultat kola ne smije biti prazan!').trim().isInt().toInt().escape(),
], async (req, res) => {
    const errors = validationResult(req);
    let errorsArray = errors["errors"]
    let result : any;
    let parsedTournament : Tournament = {
        tournamentId : 0,
        tournamentCreator : "undefined",
        tournamentCreatorEmail : "undefined",
        competitionName : "undefined",
        scoringSystem : {
            winPoints : 0,
            drawPoints : 0,
            lossPoints : 0
        },
        competitors : [],
        rounds : []
    };
    try {
        let query = `SELECT * FROM tournament WHERE tournamentid = ${req.body.tournamentid}`;
        result = await db.query(query, []);
        parsedTournament = databaseFileToTournamentParser(result["rows"][0]);
    }
    catch (e) {
        console.log(e);
        res.render('tournament-na', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture)});
    }
    if (req.oidc.user?.name != parsedTournament.tournamentCreator || req.oidc.user?.email != parsedTournament.tournamentCreatorEmail) {
        return
    }
    if (errorsArray.length > 0) {
        res.render('tournament', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture), tournamentName : parsedTournament?.competitionName, rounds : parsedTournament?.rounds, table : matchesToTableElement(parsedTournament?.rounds, parsedTournament?.competitors) ,tournamentid : parsedTournament?.tournamentId, error:errorsArray[0].msg, url : req.protocol + '://' + req.get('host') + req.originalUrl});
    }
    for (let match of parsedTournament.rounds){
        if (match.team1 == req.body.team1 && match.team2 == req.body.team2){
            match.scoreTeam1 = Number(req.body.scoreteam1);
            match.scoreTeam2 = Number(req.body.scoreteam2);
            break;
        }
    }
    let queryUpdate = `UPDATE tournament SET rounds = '${JSON.stringify(parsedTournament.rounds)}' WHERE tournamentid = ${req.body.tournamentid}`;
    try {
        result = await db.query(queryUpdate, []);
        res.redirect(`/tournament?code=${req.body.tournamentid}`);
    }
    catch (e) {
        console.log(e);
        res.render('tournament', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture), tournamentName : parsedTournament?.competitionName, rounds : parsedTournament?.rounds, table : matchesToTableElement(parsedTournament?.rounds, parsedTournament?.competitors), tournamentid : parsedTournament?.tournamentId, error: e.message, url: req.protocol + '://' + req.get('host') + req.originalUrl});
    }
});

tournamentRoute.post('/delete', requiresAuth(), [
    body('tournamentid', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
], async (req, res) => {
    const errors = validationResult(req);
    let errorsArray = errors["errors"]
    if (errorsArray.length > 0) {
        res.render('tournament', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture), error:errorsArray[0].msg, url : req.protocol + '://' + req.get('host') + req.originalUrl});
    }
    else {
        let query = `SELECT * FROM tournament WHERE tournamentid = ${req.body.tournamentid}`;
        let parsedTournament : Tournament = databaseFileToTournamentParser((await db.query(query, []))["rows"][0]);
        if (req.oidc.user?.name != parsedTournament.tournamentCreator || req.oidc.user?.email != parsedTournament.tournamentCreatorEmail) {
            return
        }
        let tournamentId = req.body.tournamentid;
        query = `DELETE FROM tournament WHERE tournamentid = ${tournamentId}`;
        try {
            const result = await db.query(query, []);
            res.redirect('/profile');
        }
        catch (e) {
            console.log(e);
        }
    }
});
