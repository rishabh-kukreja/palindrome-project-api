// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../index");
// const { response } = require("express");

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../config/server.js";
import { response } from "express";

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("Palindrome API", () => {
  // GET
  let messageIdToBeUsed;

  describe("Get /messages", () => {
    it("it should get all the messages", (done) => {
      chai
        .request("https://palindrome-project.herokuapp.com")
        .get("/messages")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          //   console.log(response.body);
          done();
        });
    });

    it("it should not get all the messages", (done) => {
      chai
        .request("https://palindrome-project.herokuapp.com")
        .get("/messaes")
        .end((err, response) => {
          response.should.have.status(404);
          //   response.body.should.be.a("array");
          //   console.log(response.body);
          done();
        });
    });
  });

  // POST
  describe("POST /message/", () => {
    it("Test POST a message", (done) => {
      const message = {
        userName: "Rohit Sharma",
        messageBody: "pikachu",
      };
      chai
        .request("https://palindrome-project.herokuapp.com")
        .post("/messages")
        .send(message)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("userName");
          response.body.should.have.property("messageBody");
          response.body.should.have.property("is_palindrome");
          response.body.should.have.property("messageDate");
          response.body.should.have.property("userName").eq(message.userName);
          response.body.should.have
            .property("messageBody")
            .eq(message.messageBody);
          messageIdToBeUsed = response.body._id;
          done();
        });
    });

    it("Test won't POST a message", (done) => {
      const message = {
        messageBody: "pikachu",
      };
      chai
        .request("https://palindrome-project.herokuapp.com")
        .post("/messages")
        .send(message)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  // GET( by id)
  describe("Get /message/:id", () => {
    it("Test get a message by id", (done) => {
      chai
        .request("https://palindrome-project.herokuapp.com")
        .get("/messages/" + messageIdToBeUsed)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("userName");
          response.body.should.have.property("messageBody");
          response.body.should.have.property("is_palindrome");
          response.body.should.have.property("messageDate");
          response.body.should.have.property("_id").eq(messageIdToBeUsed);
          done();
        });
    });
    it("Test message doesn't exist by given id", (done) => {
      const messageId = "623d677e06b753a5a5e0a2b7";

      chai
        .request("https://palindrome-project.herokuapp.com")
        .get("/messages/" + messageId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq('{"message":"Cannot find message"}');
          done();
        });
    });
  });

  // PATCH
  describe("PATCH /message/:id", () => {
    it("Test PATCH a message by id", (done) => {
      const message = {
        messageBody: "charizard",
      };
      chai
        .request("https://palindrome-project.herokuapp.com")
        .patch("/messages/" + messageIdToBeUsed)
        .send(message)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("userName");
          response.body.should.have.property("messageBody");
          response.body.should.have.property("is_palindrome");
          response.body.should.have.property("messageDate");
          response.body.should.have.property("_id").eq(messageIdToBeUsed);
          response.body.should.have
            .property("messageBody")
            .eq(message.messageBody);

          done();
        });
    });
  });

  // DELETE
  describe("DELET /message/:id", () => {
    it("Test DELETE a message by id", (done) => {
      chai
        .request("https://palindrome-project.herokuapp.com")
        .delete("/messages/" + messageIdToBeUsed)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
    it("Test - DELETE not message id", (done) => {
      chai
        .request("https://palindrome-project.herokuapp.com")
        .delete("/messages/" + "623d677e06b753a5a5e0a2b7")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
