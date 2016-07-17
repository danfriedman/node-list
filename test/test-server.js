var chai = require('chai');
var chaihttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaihttp);

describe('Shopping List', function() {
   it('should return a json list of items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
               res.should.have.status(200);
               //res.should.be.json;
               //res.body.should.be.a('array');
               //res.body[0].should.be.a('object');
               done();
               //if (err) throw err; //to handle err?
            });
   });
   it('should create a new item on post');
   it('should remove an item on delete');
   it('should return 400 if user deletes an item that doesnt exist');
   it('should edit an items name on put');
});

exports.app = app;
exports.storage = storage;