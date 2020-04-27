import express from 'express';
import passport from 'passport';
import enumRoles from './enum.roles';
import UsersService from './service';

const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const userData = req.body;
        const user = req.user;
        if (user.role === enumRoles.ROLES.ADMIN) {
            const userAdded = await UsersService.addUser(userData);
            res.status(201).json(userAdded);
        }else{
            res.status(401).json({message: 'No eres admin'});
        }
    } catch (err) {
        res.status(500).json({message: 'Error'});
    }

})

export default router;