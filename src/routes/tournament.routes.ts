import express from 'express';
import memoryArray from '../data/memory';


export const tournamentRoute = express.Router();



tournamentRoute.use(express.urlencoded({ extended: true }));
tournamentRoute.use(express.static('../data'));


tournamentRoute.get('/', (req, res) => {   
    console.log(memoryArray)
    console.log(memoryArray[0].rounds)
    let rounds = memoryArray[0].rounds
    for (let round of rounds) {
        console.log(round)
    }
    res.render('tournament', { username: (req.oidc.user?.name), tournamentName : memoryArray[0].competitionName, rounds : memoryArray[0].rounds});
}
);

    
