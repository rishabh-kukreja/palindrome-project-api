import {
  createNewMessage,
  palindromCheck,
  getAllMessages,
  getMessageById,
  deleteMessageById,
} from "../services/service.js";
import sinon, { stub } from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../config/server.js";
import { response } from "express";
import Message from "../models/message.js";
import { expect } from "chai";

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("Service Unit Tests", function () {
  describe("Save functionality", function () {
    it("Save to db functionality", async function () {
      const name = "Akshay";
      const text = "fake message";
      const is_palindrome = palindromCheck(text);
      sinon
        .stub(Message.prototype, "save")
        .returns({ name, text, is_palindrome });
      const returnedUser = await createNewMessage(name, text);
      expect(returnedUser.name).to.equal(name);
      expect(returnedUser.text).to.equal(text);
      expect(returnedUser.is_palindrome).to.equal(is_palindrome);
    });
  });

  describe("Find User functionality", function () {
    it("Find msg in DB functionality", async function () {
      const name = "Rish";
      const text = "wow";
      const is_palindrome = palindromCheck(text);
      // sinon.stub(Message, "countDocuments").returns(0);
      sinon.stub(Message, "find").returns({ name, text, is_palindrome });
      const returnedUser = await getAllMessages();
      // console.log(returnedUser);
      expect(returnedUser.name).to.equal(name);
      expect(returnedUser.text).to.equal(text);
      expect(returnedUser.is_palindrome).to.equal(is_palindrome);
    });
  });
});

describe("Path API Test", () => {
  // GET
  let messageIdToBeUsed;
  describe("Get /messages", () => {
    it("it should get all the messages", (done) => {
      chai
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
        .post("/messages")
        .send(message)
        .end((err, response) => {
          response.should.have.status(200);
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
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
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
        .request("http://localhost:3000")
        .delete("/messages/" + messageIdToBeUsed)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
    it("Test - DELETE not message id", (done) => {
      chai
        .request("http://localhost:3000")
        .delete("/messages/" + "623d677e06b753a5a5e0a2b7")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
