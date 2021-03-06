# palindrome-project-api

## Project Description
The project is about building a rest api Messages that performs the crud operations such as following:
* Creating a message 
* Retrieving the list of messages/ single message
* Updating a message
* Deleting a message

The message api takes two parameters i.e the username of the person who’s sending the message and the messagebody which is the text that the user is sending. The output is the information about the message sender’s name, message text, date. The output also has a property which tells whether the message send is a palindrome or not. It’s depicted by the field “is_palindrome”. If it is true, then the message is a palindrome. 

![Image](https://github.com/rishabh-kukreja/palindrome-project-api/blob/main/img/rest-design.jpg)

Response 

```
{
    "_id": "623d67a306b753a5a5e0a2bd",
    "userName": "Bruce Banner",
    "messageBody": "hahahah",
    "is_palindrome": true,
    "messageDate": "2022-03-25T06:56:35.821Z",
    "__v": 0
  }
  ```


The REST has 3 main components, i.e Client, Server, and Database.

#### System Architecture
![Image description](https://github.com/rishabh-kukreja/palindrome-project-api/blob/main/img/system-architecture.jpg)


### REST API

The service has 4 endpoints which produce JSON responses.

**POST** */message*
* Consumes content-type: application/json
* requires values of 2 fields: userName, messageBody.
* returns the posted message with the id, username, messagebody, is_palindrome or throws exception

**GET** */message*
* returns the list of all messages

**GET** */message/{id}*
* requires the id of the specif message
* returns the specific message and determines if it is a palindrome or throws error if message with id doesn't exist

**DELETE** */message/{id}*
* requires the id of the message to be deleted
* returns the confirmation on success else throws exception



#### Sequence Diagram for GET request

![Image](https://github.com/rishabh-kukreja/palindrome-project-api/blob/main/img/sequence-diagram.jpg)

### Build
1. Clone the repo. cd into the repo and open the terminal. To build, start run the following 
```
Install the dependencies
$ npm install

Start the application
$ npm start
```
### Deploy
I am using heroku for deplyoing the application
* Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
```
$ heroku login

Clone the repo
$ heroku git:clone -a palindrome-project 
$ cd palindrome-project

Deploy
$ git add .
$ git commit -am "make it better"
$ git push heroku master

````
* App live on - https://palindrome-project.herokuapp.com/messages

### Test
Testing is done using Mocha and Chai. To start the test, run the following

```
start the app $ npm start
run the test $ npm test
```


