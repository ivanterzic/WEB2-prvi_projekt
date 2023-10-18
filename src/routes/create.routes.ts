import express from 'express';

export const createRoute = express.Router();

createRoute.get('/', (req, res) => {
    res.render('create', { username: (req.oidc.user?.name)});
});