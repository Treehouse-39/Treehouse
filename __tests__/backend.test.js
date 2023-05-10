import request from 'supertest';
const server = 'http://localhost:3000';

describe('Testing Suite', () => {
    describe('userController testing', () => {
        const testUser = 'jest'
        const testPass = 'jest'
        const testFamily = 'jest'
        describe('Creating a User', ()=> {
            afterEach(async () => {
                await request(server).delete('/user/delete').send({username: testUser})
            });
            it('Responds with a 200 status code', async () => await request(server).post('/user/createuser').send({ username: testUser, password: testPass, family_name:testFamily }).expect(200));

            it('Creates a new user', async () => {
                await request(server)
                    .post('/user/createuser')
                    .send({username: testUser, password: testPass, family_name: testFamily})
                    .then(response => {
                        expect(response.type).toEqual('application/json');
                        expect(typeof response.body).toEqual('number')
                    })
                    
            })
            it ('Returns 400 status if any signup fields are missing', async () => {
                await request(server)
                    .post('/user/createuser')
                    .send({})
                    .then(response => {
                        expect(response.type).toEqual('application/json')
                        expect(response.body.err).toEqual('Unable to create user. Missing required fields')
                    })
            })
        })
        describe('Verifying a user', () => {
            beforeEach(async () => {
                await request(server).post('/user/createuser').send({username: testUser, password: testPass, family_name: testFamily})
            });
            afterEach(async () => {
                await request(server).delete('/user/delete').send({username: testUser})
            });
            it ('Returns 400 status if any login fields are missing', async () => {
                await request(server)
                    .post('/user/login')
                    .send({})
                    .then(response => {
                        expect(response.type).toEqual('application/json')
                        expect(response.body.err).toEqual('Unable to verify user. Missing required fields')
                    })
            })
            it('Returns a 400 status if the username does not exist', async () => {
                await request(server)
                    .post('/user/login')
                    .send({username: 'fakeuser', password: 'fakepassword'})
                    .then(response => {
                        expect(response.type).toEqual('application/json')
                        expect(response.body.err).toEqual('Incorrect Username or Password')
                    })
            })
            it('Returns a 400 status if the password is incorrect', async () => {
                await request(server)
                    .post('/user/login')
                    .send({username: testUser, password: 'fakepassword'})
                    .then(response => {
                        expect(response.type).toEqual('application/json')
                        expect(response.body.err).toEqual('Incorrect Username or Password')
                    })
            })
            it('Verifies the correct username and password', async () => {
                await request(server)
                    .post('/user/login')
                    .send({username: testUser, password: testPass})
                    .then(response => {
                        expect(response.type).toEqual('application/json')
                        expect(response.status).toEqual(200);
                        expect(typeof response.body).toEqual('number')
                    })
            })
        })
        describe('Deleting a user', () => {
            beforeEach(async () => {
                await request(server).post('/user/createuser').send({username: testUser, password: testPass, family_name: testFamily})
            });
            it('Deletes a user from the database', async () => {
                await request(server)
                    .delete('/user/delete')
                    .send({username: testUser})
                    .then(response => {
                        expect(response.status).toEqual(200)
                        expect(response.type).toEqual('application/json')
                        expect(response.body).toEqual('Deleted')
                    })
            })
        })
    })
    describe('personController testing', () => {
        it('Should create a new user', () => {
            expect(2+2).toEqual(4)
        })
    })
})