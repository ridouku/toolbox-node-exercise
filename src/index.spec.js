const request = require('supertest');
const app = require('./index');
const chai = require('chai');
const expect = chai.expect;

describe('Index tests', () => {
    let server;
    process.env.PORT = 9999;
    beforeEach(() => {

        server = app.listen(9999);
    })

    afterEach(() => {
        server.close()
    })

    it('should test successfully response', (done) => {
        request(server)
            .post('/getText')
            .send({text: 'Text Test'})
            .set('Accept', 'application/json')
            .expect(200)
            .end((_, res) => {
                expect(res.body.response).to.be.eq('Text Test');
                done();
            });
    });

    it('should test, validation body error', (done) => {
        request(server)
            .post('/getText')
            .send({noKey: 'Text Test'})
            .set('Accept', 'application/json')
            .expect(400)
            .end(() => {
                done();
            });
    });
});