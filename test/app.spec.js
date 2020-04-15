import request from 'supertest';
import app from '../src/app';


describe('App test', () => {

    it('should hello', async () => {
        await request(app)
        .get('/hello')
        .expect(200, 'Hello from repository**')
    })
})