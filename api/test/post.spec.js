// // Endpoint testing with mocha and chai and chai-http
//
// // Import libraries
// const chai = require("chai");
// const chaiHttp = require("chai-http");
//
// const should = chai.should();
// const mongoose = require("mongoose");
//
// // Import Server
// var server = require("../../server");
//
// // Import Todo Model
// var Post = require("../models/postModel");
// var User = require('../models/userModel');
//
// // use chaiHttp for making the actual HTTP requests
// chai.use(chaiHttp);
// describe('Post API', function() {
//   let newUser
//   chai.request(server)
//   .post('/auth/register')
//   .send({
//     fullName: 'Cook Indomie',
//     email: 'mocha@test.com',
//     password: 'password',
//     isAdmin: true
//   })
//   .end((err, res) => {
//     chai.request(server)
//     .post('auth/sign_in')
//     .send({
//       email: 'mocha@test.com',
//       password: 'password',
//     })
//     done();
//     console.log(res.body)
//   })
//
//   // before(function(done) {
//   //    newUser = new User({
//   //     fullName: 'Cook Indomie',
//   //     email: 'mocha@test.com',
//   //     password: 'password',
//   //     isAdmin: true
//   //   })
//   //   newUser.save(function(err) {
//   //     done();
//   //   });
//   // });
//   // afterEach(function(done) {
//   //   User.collection.drop().then(function() {
//   //
//   //     // success
//   //   }).catch(function() {
//   //
//   //     // error handling
//   //     console.warn('collection may not exist');
//   //   })
//   //   done();
//   // });
//   beforeEach(function(done) {
//     var newPost = new Post({
//       title: 'Cook Indomie',
//       content: 'Test content'
//     })
//     newPost.save(function(err) {
//       done();
//     });
//   });
//   afterEach(function(done) {
//     Post.collection.drop().then(function() {
//
//       // success
//     }).catch(function() {
//
//       // error handling
//       console.warn('collection may not exist');
//     })
//     done();
//   });
//
//   it('should list ALL Posts on/post/all GET', function(done) {
//     chai.request(server)
//       .get('/post/all')
//       .end(function(err, res) {
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('array');
//         res.body[0].should.have.property('title');
//         res.body[0].should.have.property('content');
//         res.body[0].should.have.property('_id');
//         done();
//       });
//   });
//
//   it('should add a post on /post/create POST', function(done) {
//     console.log(newUser.token);
//       chai.request(server)
//         .post('/post/create')
//         .set('Authorization', 'JWT ' + newUser.token)
//         .send({
//           'title': 'Cook Indomie',
//           'content': 'This test'
//         })
//         .end(function(err, res) {
//
//           // the res object should have a content of 201
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('content');
//           res.body.should.have.property('_id');
//           res.body.title.should.equal('Cook Indomie');
//           res.body.content.should.equal('This test');
//           done();
//         });
//     })
//
//   it('should update the content of a /post/update/<id> Put', function(done) {
//     chai.request(server)
//       .get('/post/all')
//       .end(function(err, res) {
//         chai.request(server)
//           .patch('/post/update/' + res.body[0]._id)
//
//           // this is like sending $http.post or this.http.post in Angular\
//           .send({
//             'title': "Cook Indomie",
//             'content': 'update test'
//           })
//           // when we get a response from the endpoint
//           // in other words,
//           .end(function(err, response) {
//             // the res object should have a content of 200
//             response.should.have.status(200);
//             response.should.be.json;
//             response.body.should.be.a('object');
//             response.body.should.have.property('title');
//             response.body.should.have.property('content');
//             response.body.should.have.property('_id');
//             response.body.title.should.equal('Cook Indomie');
//             response.body.content.should.equal('update test');
//             done();
//           });
//       });
//   });
//
//   it('should delete a todo on /post/delete/<id> DELETE without Auth Token', function(done) {
//     chai.request(server)
//       .get('/post/all/')
//       .end(function(err, res) {
//         chai.request(server)
//           .delete('/post/delete/' + res.body[0]._id)
//           .end(function(error, response) {
//             response.should.have.status(200);
//             response.body.should.have.property('message');
//             response.body.message.should.equal('Post successfully deleted');
//             done();
//           });
//       });
//   });
// })
