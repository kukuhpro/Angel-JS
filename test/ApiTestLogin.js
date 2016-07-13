var env        = require('../helpers/env')();
var request    = require('request');
var chai       = require('chai');
var expect     = chai.expect;
var baseUrlApi = 'http://' + env.baseUrl + '/api/v1';
var headers    = {
    'app-key': 'x',
    'app-secret': 'x'
};


// Submit Login for subdomain with Data empty
describe('Submit Login For subdomain with data empty', function() {
    it('should return 422', function(done) {
        request.post(baseUrlApi + '/test', { form: {}, headers: headers }, function(err, res, body) {
            expect(res.statusCode).to.equal(422);
            expect(JSON.parse(res.body)).to.have.property('status')
                .and.is.equal(2);
            done();
        });
    });
});
