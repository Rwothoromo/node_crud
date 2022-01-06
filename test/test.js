// During testing, the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let chaiShould = chai.should();
var chaiExpect = chai.expect;
var chaiAssert = chai.assert;

// Mocha test
// With mocha, you can also include the use of assertion libraries like assert, expect, and others.
var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});


// Chai includes basic assertions that you can use to verify behavior e.g. should, expect, assert
// to evaluate conditions of code you’re testing
var foo = "bar";
var tea = {
    'flavors': 'Soy'
}

// Should
foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors')
    .with.lengthOf(3);

// Expect
chaiExpect(foo).to.be.a('string');
chaiExpect(foo).to.equal('bar');
chaiExpect(foo).to.have.lengthOf(3);
chaiExpect(tea).to.have.property('flavors')
    .with.lengthOf(3);

// Assert
chaiAssert.typeOf(foo, 'string');
chaiAssert.equal(foo, 'bar');
chaiAssert.lengthOf(foo, 3)
chaiAssert.property(tea, 'flavors');
chaiAssert.lengthOf(tea.flavors, 3);


const quotesListMock = [
    {
        "name": "Elijah Rwothoromo",
        "quote": "Test"
    }
]

// chai-http
chai.use(chaiHttp);

describe('Quotes', () => {
    // empty db before testing
    beforeEach((done) => {
        // could be
        // Quote.remove({}, (err) => {
        //    done();
        // });
        chai.request(server)
            .delete('/quotes')
            .end((err, res) => {
                res.should.have.status(200);
                chaiExpect(res.body).to.deep.equal({})
                done();
            });
    });

    /**
     * Test the /POST route without quote
     */
    describe('/POST quote', () => {
        it('it should not POST a quote without quote field', (done) => {
            let quote = {
                name: "Elijah Rwothoromo"
            }
            chai.request(server)
                .post('/quotes')
                .send(quote)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    chaiExpect(res.body).to.deep.equal({})
                    done();
                    // .. res.body.should.have.property('errors');
                    // res.body.errors.should.have.property('name');
                    // res.body.errors.pages.should.have.property('quote').eql('required');
                });
        });
    });

    /**
     * Test the /POST route with all data
     */
    describe('/POST quote', () => {
        it('it should POST a quote successfully', (done) => {
            let quote = {
                name: "Elijah Rwothoromo",
                quote: "Test"
            }
            chai.request(server)
                .post('/quotes')
                .send(quote)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('acknowledged').eql(true);
                    res.body.should.have.property('insertedId');
                    done();
                });
        });
    });

    /**
     * Test the /GET route for added quotes
     */
    describe('GET /quotes', () => {
        it('should return a list of quotes when called', (done) => {
            chai.request(server)
                .get('/quotes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                    expect(res.body).to.have.value(
                        {
                            "name": "Elijah Rwothoromo",
                            "quote": "Test"
                        }
                    );

                    expect(res.body).to.deep.equal(quotesListMock);
                    done();
                });
        });
    });

});
