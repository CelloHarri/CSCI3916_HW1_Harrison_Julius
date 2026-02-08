const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../server');

chai.use(chaiHttp);

describe('Echo Server', () => {

    describe('POST /', () => {

        it('should echo plain text with text/plain content-type', (done) => {
            const testData = 'Hello, World!';

            chai.request(app)
                .post('/')
                .set('Content-Type', 'text/plain')
                .send(testData)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.should.have.header('content-type', /text\/plain/);
                    res.text.should.equal(testData);
                    done();
                });
        });

        it('should echo JSON with content-type preservation', (done) => {
            const testData = { message: 'test', value: 123 };
            const jsonString = JSON.stringify(testData);

            chai.request(app)
                .post('/')
                .set('Content-Type', 'application/json')
                .send(jsonString)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.should.have.header('content-type', /application\/json/);
                    res.text.should.equal(jsonString);
                    done();
                });
        });

        it('should handle empty body', (done) => {
            chai.request(app)
                .post('/')
                .set('Content-Type', 'text/plain')
                .send('')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.should.have.header('content-type', /text\/plain/);
                    res.text.should.equal('');
                    done();
                });
        });

    });

});


