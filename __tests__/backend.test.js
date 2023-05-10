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
        it('Returns all people', async () => {
            await request(server)
                .get('/api/')
                .then(response => {
                    expect(response.status).toEqual(200)
                    expect(Array.isArray(response.body.people)).toBe(true)
                })
        })
        describe('Adding and getting a person', () => {
            const testPerson = {
                familyTree: 4,
                firstName: 'Jest',
                lastName: 'Jest',
                sex: 'male',
                phoneNumber: '1234567890',
                email: 'jest@jest.com',
                birthday: '1900-01-01',
                deathDate: '2000-01-01',
                streetAddress: '123 Jest St',
                city: 'Jest',
                state: 'Jest',
                zipCode: '12345',
            }
            afterAll(async () => {
                await request(server).delete('/api/deletePerson').send({firstName: testPerson.firstName, lastName: testPerson.lastName, birthday: testPerson.birthday})
            });
            it('Returns a 200 status', async () => {
                await request(server)
                    .post('/api/addPerson')
                    .send(testPerson)
                    .then(response => {
                        expect(response.status).toEqual(200)
                    })
            })
            it('Gets the person just created', async () => {
                await request(server)
                    .get('/api/getPerson/Jest/Jest/1900-01-01')
                    .then(response => {
                        expect(response.status).toEqual(200)
                        expect(response.body.person.family_tree).toEqual(testPerson.familyTree)
                        expect(response.body.person.first_name).toEqual(testPerson.firstName)
                        expect(response.body.person.last_name).toEqual(testPerson.lastName)
                        expect(response.body.person.birthday.slice(0, 10)).toEqual(testPerson.birthday)
                        expect(response.body.person.sex).toEqual(testPerson.sex)
                    })
            })
        })
        describe('Adding a relative', () => {
            const testPerson = {
                familyTree: 4,
                firstName: 'Jest',
                lastName: 'Jest',
                sex: 'male',
                phoneNumber: '1234567890',
                email: 'jest@jest.com',
                birthday: '1900-01-01',
                deathDate: '2000-01-01',
                streetAddress: '123 Jest St',
                city: 'Jest',
                state: 'Jest',
                zipCode: '12345',
            }
            const testMom = {
                familyTree: 4,
                firstName: 'JestMom',
                lastName: 'JestMom',
                sex: 'female',
                phoneNumber: '1234567890',
                email: 'jest@jest.com',
                birthday: '1900-01-01',
                deathDate: '2000-01-01',
                streetAddress: '123 Jest St',
                city: 'Jest',
                state: 'Jest',
                zipCode: '12345',
            }
            const testDad = {
                familyTree: 4,
                firstName: 'JestDad',
                lastName: 'JestDad',
                sex: 'male',
                phoneNumber: '1234567890',
                email: 'jest@jest.com',
                birthday: '1900-01-01',
                deathDate: '2000-01-01',
                streetAddress: '123 Jest St',
                city: 'Jest',
                state: 'Jest',
                zipCode: '12345',
            }
            const testSpouse = {
                familyTree: 4,
                firstName: 'JestSpouse',
                lastName: 'JestSpouse',
                sex: 'female',
                phoneNumber: '1234567890',
                email: 'jest@jest.com',
                birthday: '1900-01-01',
                deathDate: '2000-01-01',
                streetAddress: '123 Jest St',
                city: 'Jest',
                state: 'Jest',
                zipCode: '12345',
            }
            beforeAll(async () => {
                await request(server).post('/api/addPerson').send(testPerson)
            })
            afterAll(async () => {
                await request(server).delete('/api/deleteTestPeople').send({queryString: `DELETE FROM people WHERE first_name='${testPerson.firstName}' OR first_name='${testMom.firstName}' OR first_name='${testDad.firstName}' OR first_name='${testSpouse.firstName}'`})
            });
            it ('Should add a mom and update the current persons mom id', async () => {
                let momId
                await request(server)
                    .post(`/api/addRelation/Jest/Jest/1900-01-01/mom`)
                    .send(testMom)
                    .then(response => {
                        expect(response.status).toEqual(200);
                        expect(typeof response.body.childId).toEqual('number')
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/JestMom/JestMom/1900-01-01')
                            .then(response => {
                                momId = response.body.person.id
                                expect(response.status).toEqual(200)
                                expect(response.body.person.family_tree).toEqual(testMom.familyTree)
                                expect(response.body.person.first_name).toEqual(testMom.firstName)
                                expect(response.body.person.last_name).toEqual(testMom.lastName)
                                expect(response.body.person.birthday.slice(0, 10)).toEqual(testMom.birthday)
                                expect(response.body.person.sex).toEqual(testMom.sex)
                            })
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/Jest/Jest/1900-01-01')
                            .then(response => {
                                expect(response.status).toEqual(200)
                                expect(response.body.person.mom_id).toEqual(momId)
                            })
                    })
            });
            it ('Should add a dad and update the current persons dad id', async () => {
                let dadId
                await request(server)
                    .post(`/api/addRelation/Jest/Jest/1900-01-01/dad`)
                    .send(testDad)
                    .then(response => {
                        expect(response.status).toEqual(200);
                        expect(typeof response.body.childId).toEqual('number')
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/JestDad/JestDad/1900-01-01')
                            .then(response => {
                                dadId = response.body.person.id
                                expect(response.status).toEqual(200)
                                expect(response.body.person.family_tree).toEqual(testDad.familyTree)
                                expect(response.body.person.first_name).toEqual(testDad.firstName)
                                expect(response.body.person.last_name).toEqual(testDad.lastName)
                                expect(response.body.person.birthday.slice(0, 10)).toEqual(testDad.birthday)
                                expect(response.body.person.sex).toEqual(testDad.sex)
                            })
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/Jest/Jest/1900-01-01')
                            .then(response => {
                                expect(response.status).toEqual(200)
                                expect(response.body.person.dad_id).toEqual(dadId)
                            })
                    })
            })
            it ('Should add a spouse and update the current persons spouse id', async () => {
                let spouseId
                let currentId
                await request(server)
                    .post(`/api/addRelation/Jest/Jest/1900-01-01/spouse`)
                    .send(testSpouse)
                    .then(response => {
                        expect(response.status).toEqual(200);
                        expect(typeof response.body.spouseId).toEqual('number')
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/JestSpouse/JestSpouse/1900-01-01')
                            .then(response => {
                                spouseId = response.body.person.id
                                expect(response.status).toEqual(200)
                                expect(response.body.person.family_tree).toEqual(testSpouse.familyTree)
                                expect(response.body.person.first_name).toEqual(testSpouse.firstName)
                                expect(response.body.person.last_name).toEqual(testSpouse.lastName)
                                expect(response.body.person.birthday.slice(0, 10)).toEqual(testSpouse.birthday)
                                expect(response.body.person.sex).toEqual(testSpouse.sex)
                            })
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/Jest/Jest/1900-01-01')
                            .then(response => {
                                currentId = response.body.person.id
                                expect(response.status).toEqual(200)
                                expect(response.body.person.spouse_id).toEqual(spouseId)
                            })
                    })
                    .then(async () => {
                        await request(server)
                            .get('/api/getPerson/JestSpouse/JestSpouse/1900-01-01')
                            .then(response => {
                                expect(response.status).toEqual(200)
                                expect(response.body.person.spouse_id).toEqual(currentId)
                            })
                    })
            })
        })
        describe('Adding a child', () => {

        })
        describe('Deleting a person', () => {

        })
    })
})