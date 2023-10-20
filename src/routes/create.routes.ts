import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import { body, validationResult } from 'express-validator';
import { Tournament, roundCreatorBergerTables } from '../helpers/tournamenthelper.js';
import {db} from '../db/index.js';

export const createRoute = express.Router();

createRoute.use(express.urlencoded({ extended: true }));
createRoute.use(express.static('../data'));
createRoute.get('/', requiresAuth(), (req, res) => {
    res.render('create', { username: (req.oidc.user?.name), message : undefined, error_message : undefined, competitionName : undefined, winPoints : undefined, drawPoints : undefined, lossPoints : undefined, competitors : undefined});
});

createRoute.post('/', requiresAuth(), [
    // Add validation and sanitization middleware
    body('competitionName', 'Ime natjecanja ne smije biti prazno!').trim().isLength({ min: 1 }).escape(),
    body('winPoints', 'Bodovi za pobjedu ne smiju biti prazni!').trim().isInt().escape(),
    body('drawPoints', 'Bodovi za neriješeno ne smiju biti prazni!').trim().isInt().escape(),
    body('lossPoints', 'Bodovi za poraz ne smiju biti prazni!').trim().isInt().escape(),
    body('competitors', 'Popis natjecatelja ne smije biti prazan!').trim().isLength({ min: 1 }).escape(),
],  async (req, res) => {
    const errors = validationResult(req);
    let errorsArray = errors["errors"]
    let comps : string[] = req.body.competitors.trim().split("\r\n");
    if (comps.length == 1) {
        comps = req.body.competitors.trim().split(";");
    }
    console.log(comps);
    console.log(comps.length);
    if (comps.length < 4 || comps.length > 8) {
        errorsArray.push({msg : "Broj natjecatelja mora biti između 4 i 8!"});
    }
    console.log(errorsArray);
    if (errorsArray.length > 0) {
        res.render('create', { username: (req.oidc.user?.name), error_message: errorsArray[0].msg, message : undefined, 
        competitionName : req.body.competitionName, winPoints : req.body.winPoints, drawPoints : req.body.drawPoints, lossPoints : req.body.lossPoints, competitors : req.body.competitors});
    }
    else {
        const newTournament : Tournament = {
            tournamentId : undefined,
            tournamentCreator : req.oidc.user?.sid,
            competitionName : req.body.competitionName,
            scoringSystem : {
                winPoints : Number(req.body.winPoints),
                drawPoints : Number(req.body.drawPoints),
                lossPoints : Number(req.body.lossPoints)
            },
            competitors : comps,
            rounds : roundCreatorBergerTables(comps)
        }
        const sql = `INSERT INTO tournament (tournamentCreator, tournamentName, competitors, scoringSystem, rounds) VALUES ('${req.oidc.user.sid}', '${req.body.competitionName.trim()}', '${comps}', '${JSON.stringify(newTournament.scoringSystem)}', '${JSON.stringify(newTournament.rounds)}')`;
        try {
            const result = await db.query(sql, []);
            console.log(result)
        }
        catch (e) {
            console.log(e);
            res.render('create', { username: (req.oidc.user.name), error_message: "Greška kod spremanja u bazu podataka!", message : undefined, 
                competitionName : req.body.competitionName, winPoints : req.body.winPoints, drawPoints : req.body.drawPoints, lossPoints : req.body.lossPoints, competitors : req.body.competitors});
        }
        res.render('create', { username: (req.oidc.user?.name), error_message : undefined, message : "Natjecanje uspješno kreirano!", competitionName : undefined, winPoints : undefined, drawPoints : undefined, lossPoints : undefined, competitors : undefined});
    }
    
});