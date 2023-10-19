import express from 'express';
import memoryArray from '../data/memory';


export const tournamentRoute = express.Router();



tournamentRoute.use(express.urlencoded({ extended: true }));
tournamentRoute.use(express.static('../data'));


tournamentRoute.get('/', (req, res) => {   
    console.log(memoryArray)
    res.render('tournament', { username: (req.oidc.user?.name)});
}
);

    
