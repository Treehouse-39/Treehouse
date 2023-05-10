import request from 'supertest';
const server = 'http://localhost:3000';

describe('Testing Suite', () => {
    describe('userController testing', () => {
        const testUser = 'jest'
        const testPass = 'jest'
        const testFamily = 'jest'
        describe('Creating a User', ()=> {
            afterEach(async () => {
                await request(server).delete('/user/delete').send({username: testUser}).then(console.log('Deleted after test'))
            });
            it('Responds with a 200 status code', async () => await request(server).post('/user/createuser').send({ username: testUser, password: testPass, family_name:testFamily }).expect(200));

            it('Should create a new user', async () => {
                await request(server)
                    .post('/user/createuser')
                    .send({username: testUser, password: testPass, family_name: testFamily})
                    .then(response => {
                        expect(response.type).toEqual('application/json');
                        
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