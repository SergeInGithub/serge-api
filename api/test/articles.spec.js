import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'

import server from '../../server.js'

import Post from '../models/postModel.js'
import User from '../models/userModel.js'

const should = chai.should()

chai.use(chaiHttp)
describe('My Brand : Post Unit', () => {
  before((done) => {
    const newUser = new User({
      fullName: 'SergeN',
      email: 'serge@gmail.com',
      password: 'myPassword',
      isAdmin: true
    })
    newUser.save((err, user) => {
      done()
    })
  })
  beforeEach((done) => {
    const newPost = new Post({
      title: 'Mocha Testing Testing',
      content: 'You better Work.'
    })
    newPost.save(function (err) {
      done()
    })
  })

  // afterEach(function (done) {
  //   Post.collection
  //     .drop()
  //     .then(function () {
  //       done();
  //     })
  //     .catch(function () {
  //       done();
  //     });
  // });

  it('should list ALL posts on /post/all GET', function (done) {
    chai
      .request(server)
      .get('/post/all')
      .end(function (err, res) {
        if (err) done(err)
        else {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body[0].should.have.property('title')
          res.body[0].should.have.property('content')
          res.body[0].should.have.property('_id')
          done()
        }
      })
  })
  it('should list ONE post on /post/get GET', function (done) {
    chai
      .request(server)
      .get('/post/all')
      .end(function (err, res) {
        chai
          .request(server)
          .get('/post/get/' + res.body[0]._id)
          .end((error, response) => {
            if (error) done(error)
            else {
              response.should.have.status(200)
              response.should.be.json
              response.body.should.be.a('object')
              response.body.should.have.property('title')
              response.body.should.have.property('content')
              response.body.should.have.property('_id')
              done()
            }
          })
      })
  })

  it('should add a post on /post/create POST', function (done) {
    chai
      .request(server)
      .post('/auth/sign_in')
      .send({
        email: 'serge@gmail.com',
        password: 'myPassword'
      })
      .end((err, res) => {
        chai
          .request(server)
          .post('/post/create')
          .send({
            title: 'Mocha Testing Testing Create',
            content: 'You better Work Create.'
          })
          .set('Authorization', `JWT ${res.body.token}`)
          .end(function (err, res) {
            res.should.have.status(201)
            res.should.be.json
            res.body.should.be.a('object')
            res.body.should.have.property('title')
            res.body.should.have.property('content')
            res.body.should.have.property('_id')
            res.body.title.should.equal('Mocha Testing Testing Create')
            res.body.content.should.equal('You better Work Create.')
            done()
          })
      })
  })

  it('should update a Post on /post/update/<id> PATCH with AUTH Token', function (done) {
    chai
      .request(server)
      .post('/auth/sign_in')
      .send({
        email: 'serge@gmail.com',
        password: 'myPassword'
      })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('fullName')
          res.body.should.have.property('email')
          res.body.should.have.property('token')
          const token = res.body.token
          chai
            .request(server)
            .get('/post/all')
            .end(function (err, res) {
              chai
                .request(server)
                .patch('/post/update/' + res.body[0]._id)
                .send({
                  title: 'Mocha Testing Testing Patch',
                  content: 'You better work Patch.'
                })
                .set('Authorization', 'JWT ' + token)
                .end(function (error, response) {
                  response.should.have.status(200)
                  response.should.be.json
                  response.body.should.be.a('object')
                  response.body.should.have.property('title')
                  response.body.should.have.property('content')
                  response.body.should.have.property('_id')
                  response.body.title.should.equal(
                    'Mocha Testing Testing Patch'
                  )
                  response.body.content.should.equal('You better work Patch.')
                  done()
                })
            })
        }
      })
  })
  it('should delete a Post on /post/delete/<id> DELETE with AUTH Token', function (done) {
    chai
      .request(server)
      .post('/auth/sign_in')
      .send({
        email: 'serge@gmail.com',
        password: 'myPassword'
      })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('fullName')
          res.body.should.have.property('email')
          res.body.should.have.property('token')
          const token = res.body.token
          chai
            .request(server)
            .get('/post/all')
            .end(function (err, res) {
              chai
                .request(server)
                .delete('/post/delete/' + res.body[0]._id)
                .set('Authorization', 'JWT ' + token)
                .end(function (error, response) {
                  response.should.have.status(200)
                  response.body.should.have.property('message')
                  response.body.message.should.equal(
                    'Post successfully deleted'
                  )
                  done()
                })
            })
        }
      })
  })
})
