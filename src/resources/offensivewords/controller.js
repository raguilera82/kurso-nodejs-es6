import express from 'express';
import OffensiveWordService from './service';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await OffensiveWordService.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }finally {
        next();
    }
});

router.post('/', async(req, res, next) => {
    try {
        const offensiveword = req.body;
        const result = await OffensiveWordService.add(offensiveword);
        res.status(201).json(result);   
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }finally {
        next();
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const offensiveword = req.body;
        const result = await OffensiveWordService.update(id, offensiveword);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }finally {
        next();
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await OffensiveWordService.delete(id);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }finally {
        next();
    }
});

export default router;