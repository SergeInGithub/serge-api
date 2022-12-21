
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = require("joi");

const should = chai.should();
const mongoose = require("mongoose");

var server = require("../../server");

var Post = require("../models/postModel");
var User = require("../models/userModel");

chai.use(chaiHttp);
describe("My Brand : Post Unit", () => {
  before((done) => {
    const newUser = new User({
      fullName: "SHYAKA",
      email: "davis@gmail.com",
      password: "Password!23",
      isAdmin: true,
    });
    newUser.save((err, user) => {
      done();
    });
  });
  beforeEach((done) => {
    var newPost = new Post({
      title: "Testing with Mocha",
      content:
        "Well, either this works, or I am in trouble. This needs to be at least 30 characters long. Don't remember why I chose this. I must be tripping.",
    });
    newPost.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Post.collection
      .drop()
      .then(function () {
        done();
      })
      .catch(function () {
        done();
      });
  });

  it("should list ALL posts on /post/all GET", function (done) {
    chai
      .request(server)
      .get("/post/all")
      .end(function (err, res) {
        if (err) done(err);
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body[0].should.have.property("title");
          res.body[0].should.have.property("content");
          res.body[0].should.have.property("_id");
          done();
        }
      });
  });
  it("should list ONE post on /post/get GET", function (done) {
    chai
      .request(server)
      .get("/post/all")
      .end(function (err, res) {
        chai
          .request(server)
          .get("/post/" + res.body[0]._id)
          .end((error, response) => {
            if (error) done(error);
            else {
              response.should.have.status(200);
              response.should.be.json;
              response.body.should.be.a("object");
              response.body.should.have.property("title");
              response.body.should.have.property("content");
              response.body.should.have.property("_id");
              done();
            }
          });
      });
  });

  it("should add a post on /post/create POST", function (done) {
    chai
      .request(server)
      .post("/auth/sign_in")
      .send({
        email: "davis@gmail.com",
        password: "Password!23",
      })
      .end((err, res) => {
        chai
          .request(server)
          .post("/post/create")
          .send({
            title: "Test Title",
            content:
              "Well, either this works, or I am in trouble. This needs to be at least 30 characters long. Don't remember why I chose this. I must be tripping.",
          })
          .set("Authorization", `JWT ${res.body.token}`)
          .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("content");
            res.body.should.have.property("_id");
            res.body.title.should.equal("Test Title");
            res.body.content.should.equal(
              "Well, either this works, or I am in trouble. This needs to be at least 30 characters long. Don't remember why I chose this. I must be tripping."
            );
            done();
          });
      });
  });

  it("should update a Post on /post/update/<id> PATCH with AUTH Token", function (done) {
    chai
      .request(server)
      .post("/auth/sign_in")
      .send({
        email: "davis@gmail.com",
        password: "Password!23",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("fullName");
          res.body.should.have.property("email");
          res.body.should.have.property("token");
          var token = res.body.token;
          chai
            .request(server)
            .get("/post/all")
            .end(function (err, res) {
              chai
                .request(server)
                .patch("/post/update/" + res.body[0]._id)
                .send({
                  title: "Testing with Chai - Update",
                  content:
                    "Testing content. Well, either this works, or I am in trouble. This needs to be at least 30 characters long. Don't remember why I chose this. I must be tripping.",
                })
                .set("Authorization", "JWT " + token)
                .end(function (error, response) {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a("object");
                  response.body.should.have.property("title");
                  response.body.should.have.property("content");
                  response.body.should.have.property("_id");
                  response.body.title.should.equal(
                    "Testing with Chai - Update"
                  );
                  response.body.content.should.equal(
                    "Testing content. Well, either this works, or I am in trouble. This needs to be at least 30 characters long. Don't remember why I chose this. I must be tripping."
                  );
                  done();
                });
            });
        }
      });
  });
  it("should delete a Post on /post/delete/<id> DELETE with AUTH Token", function (done) {
    chai
      .request(server)
      .post("/auth/sign_in")
      .send({
        email: "davis@gmail.com",
        password: "Password!23",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("fullName");
          res.body.should.have.property("email");
          res.body.should.have.property("token");
          var token = res.body.token;
          chai
            .request(server)
            .get("/post/all")
            .end(function (err, res) {
              chai
                .request(server)
                .delete("/post/delete/" + res.body[0]._id)
                .set("Authorization", "JWT " + token)
                .end(function (error, response) {
                  response.should.have.status(200);
                  response.body.should.have.property("message");
                  response.body.message.should.equal(
                    "Post successfully deleted"
                  );
                  done();
                });
            });
        }
      });
  });
});
