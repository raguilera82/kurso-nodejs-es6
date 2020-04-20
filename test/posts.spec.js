import request from 'supertest';
import app from '../src/app';


describe('Post Enpoint', () => {

    it('CRUD POST', async () => {

        const server = request(app);
        const newPost = {
            title: 'test',
            content: 'test',
            nameAuthor: 'author',
            nickname: 'test'
        }

        const result = await server.post('/post')
        .type('form')
        .send(newPost)
        .expect(201);

        expect(result.body.content).toEqual(newPost.content);
        expect(result.body.comments.length).toEqual(0);

        await server
        .get('/post')
        .expect(200)

    })

})