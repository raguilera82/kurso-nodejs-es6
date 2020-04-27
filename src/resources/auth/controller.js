import { config } from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

const settings = config();

router.post('/login', passport.authenticate('basic', {session: false}), async (req, res, next) => {
    try {
        const {username, role} = req.user;

        const opts = {expiresIn: 300};
        const token = jwt.sign({username, role}, settings.parsed.JWT_SECRET_KEY, opts);
        res.status(200).json({token});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

export default router;