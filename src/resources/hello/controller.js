import express from 'express';
import HelloService from './service';

const router = express.Router();

router.get('/', (req, res, next) => {
    const helloService = new HelloService();
    res.send(helloService.getHello());
});

export default router;