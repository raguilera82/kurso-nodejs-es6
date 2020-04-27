import Base64 from 'Base64';
import request from 'supertest';
import app from '../src/app';


describe('Post Enpoint', () => {

    it('CRUD POST', async () => {

        const server = request(app);

        const postsInitial = await server
        .get('/posts')
        .expect(200);

        const numberPosts = postsInitial.body.length;

        const credentials = {
            username: 'admin1',
            password: '4321'
        }
        console.log('credentials', credentials);
        const login = await server.post('/auth/login')
        .set('authorization', 'Basic ' + Base64.btoa(credentials.username+':'+credentials.password)).expect(200);

        const token = login.body.token;
        console.log('token', token);


        const newPost = {
            title: 'test',
            content: 'test',
            nameAuthor: 'author',
            nickname: 'test'
        }

        const addPost = await server.post('/posts')
        .type('form')
        .set('authorization', 'Bearer ' + token)
        .send(newPost)
        .expect(201);

        expect(addPost.body.content).toEqual(newPost.content);
        expect(addPost.body.comments.length).toEqual(0);

        const post = addPost.body;
        post.content = 'Modifico contenido';

        console.log('Update post', post._id);

        const updatePost = await server.put('/posts/' + post._id)
        .type('form')
        .set('authorization', 'Bearer ' + token)
        .send(post)
        .expect(200);

        console.log(updatePost.body);

        expect(updatePost.body.content).toEqual('Modifico contenido');

        const posts = await server
        .get('/posts')
        .expect(200);

        expect(posts.body.length).toBe(numberPosts + 1);

        await server.delete('/posts/' + addPost.body._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200);

        const postsDeleted = await server
        .get('/posts')
        .expect(200);

        expect(postsDeleted.body.length).toBe(numberPosts);

    })

    it('Not allow to delete post', async () => {
        const server = request(app);
        
        //Login with publisher P1
        const credentialsP1 = {
            username: 'p1',
            password: 'p1'
        }
        const loginP1 = await server.post('/auth/login')
        .set('authorization', 'Basic ' + Base64.btoa(credentialsP1.username+':'+credentialsP1.password)).expect(200);

        const tokenP1 = loginP1.body.token;
        console.log('Token P1: ' + tokenP1);
        
        //Create a post with P1
        const newPost = {
            title: 'test',
            content: 'test',
            nameAuthor: 'author',
            nickname: 'test'
        }
        const addPost = await server.post('/posts')
        .type('form')
        .set('authorization', 'Bearer ' + tokenP1)
        .send(newPost)
        .expect(201);

        //Login with publisher P2
        const credentialsP2 = {
            username: 'p2',
            password: 'p2'
        }
        const loginP2 = await server.post('/auth/login')
        .set('authorization', 'Basic ' + Base64.btoa(credentialsP2.username+':'+credentialsP2.password)).expect(200);
        const tokenP2 = loginP2.body.token;
        console.log('Token P2: ' + tokenP2);

        //Delete a post P1 with P2
        console.log('Post Id: ' + addPost.body._id);
        await server.delete('/posts/' + addPost.body._id)
        .set('authorization', 'Bearer ' + tokenP2)
        .expect(401);

        await server.delete('/posts/' + addPost.body._id)
        .set('authorization', 'Bearer ' + tokenP1)
        .expect(200);
    })

})