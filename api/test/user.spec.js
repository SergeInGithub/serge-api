import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import server from "../../server.js";

import User from "../models/userModel.js";

chai.use(chaiHttp);
describe("My Brand : User Unit", () => {
  beforeEach((done) => {
    const newUser = new User({
      fullName: "sergeN",
      email: "serge@gmail.com",
      password: "myPassword",
      isAdmin: true,
    });
    newUser.save((err, user) => {
      done();
    });
  });
  afterEach((done) => {
    User.collection
      .drop()
      .then(() => {
        // success
      })
      .catch(() => {
        // error handling
        console.warn("Collection may not exist!");
      });
    done();
  });
  it("should list ALL Users on /auth/all_users", (done) => {
    chai
      .request(server)
      .post("/auth/sign_in")
      // send user login details
      .send({
        email: "serge@gmail.com",
        password: "myPassword",
      })
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.token;
        chai
          .request(server)
          .get("/auth/all_users")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            if (err) done(err);
            else {
              res.should.have.status(200);
              res.should.be.json;
              //   res.body.should.be.a('object')
              //   res.body.data[0].should.have.property('fullName')
              //   res.body.data[0].should.have.property('email')
              //   res.body.data[0].should.have.property('_id')
              done();
            }
          });
      });
  });
  it("should list ONE User on /auth/get_user/<id>  GET", (done) => {
    chai
      .request(server)
      .post("/auth/sign_in")
      // send user login details
      .send({
        email: "serge@gmail.com",
        password: "myPassword",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        const token = res.body.token;
        // request to the protected route
        chai
          .request(server)
          .get("/auth/all_users")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            chai
              .request(server)
              .get("/auth/get_user/" + res.body._id)
              .set("Authorization", "JWT " + token)
              .end((error, response) => {
                if (error) done(error);
                else {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a("object");
                  done();
                }
              });
          });
      });
  });
  it("should register a User on /auth/register POST", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send({
        fullName: "sergeN2",
        email: "serge2@gmail.com",
        password: "myPassword",
      })
      .end((err, res) => {
        // the res object should have a status of 201
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        // res.body.data[0].should.have.property('fullName')
        // res.body.data[0].should.have.property('email')
        // res.body.data[0].fullName.should.equal('sergeN2')
        // res.body.data[0].email.should.equal('serge2@gmail.com')
        done();
      });
  });
  it("should sign in a user on /auth/sign_in POST", (done) => {
    chai
      .request(server)
      .post("/auth/sign_in")
      // send user login details
      .send({
        email: "serge2@gmail.com",
        password: "myPassword",
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          // console.log("this runs the login part");
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          //   res.body.data[0].should.have.property('user')
          //   res.body.data[0].user.should.have.property('isAdmin')
          //   res.body.data[0].user.should.have.property('token')
          done();
        }
      });
  });
});
