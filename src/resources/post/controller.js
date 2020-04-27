import express from 'express';
import passport from 'passport';
import OffensiveValidator from '../../middlewares/offensive-validator';
import enumRoles from '../users/enum.roles';
import PostService from './service';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const posts = await PostService.getAll();
        res.status(200).json(posts);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await PostService.getById(id);
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const post = req.body;
        post.idAuthor = req.user._id;
        const newPost = await PostService.addPost(req.body);
        res.status(201).send(newPost);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {

        const user = req.user;
        const id = req.params.id;
        const postUpdate = req.body;
        const post = await PostService.getById(id);
        if (post !== null) {
            if (post.idAuthor === user._id.toString()  || user.role === enumRoles.ROLES.ADMIN) {
                const result = await PostService.updatePost(id, postUpdate);
                console.log('Update result', result);
                res.status(200).json(result);
            }else{
                res.status(401).json({message: 'Este post no es tuyo'});
            }
        }else{
            res.status(404).json({message: 'Post no encontrado'});
        }
    } catch (err) {
        next(err);
    }finally {
        next();
    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const post = await PostService.getById(id);
        if (post !== null) {
            if (post.idAuthor === user._id.toString() || user.role === enumRoles.ROLES.ADMIN) {
                const result = await PostService.deletePost(id);
                res.status(200).json(result);
            }else{
                res.status(401).json({message: 'Este post no es tuyo'});
            }
        }else{
            res.status(404).json({message: 'Post no encontrado'});
        }
    } catch (err) {
        next(err);
    }finally {
        next();
    }
});

router.put('/:id/comment', OffensiveValidator.checkwords, async(req, res, next) => {
    try {
        const id = req.params.id;
        const comment = req.body;
        console.log('id', id);
        console.log('comment', comment);
        const postUpdate = await PostService.addComment(id, comment);
        res.status(200).json(postUpdate);
    } catch (err) {
        next(err);
    }finally {
        next();
    }
});

export default router;