import express from 'express';
import OffensiveValidator from '../../middlewares/offensive-validator';
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

router.post('/', async (req, res, next) => {
    try {
        const newPost = await PostService.addPost(req.body);
        res.status(201).send(newPost);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = req.body;
        const result = await PostService.updatePost(id, post);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'})
        }
    } catch (err) {
        next(err);
    }finally {
        next();
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await PostService.deletePost(id);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'})
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