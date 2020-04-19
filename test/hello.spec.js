import request from 'supertest';
import app from '../src/app';

describe('Hello Enpoint', () => {

    it('GET /hello', async () => {
        await request(app)
        .get('/hello')
        .expect(200, 'Hello from repository**')
    })
})