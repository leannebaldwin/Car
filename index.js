var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var AlexaSkill = require('./AlexaSkill');

var MyMazda = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MyMazda.prototype = Object.create(AlexaSkill.prototype);
MyMazda.prototype.constructor = MyMazda;

MyMazda.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MyMazda onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

MyMazda.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MyMazda onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to My Mazda, you can ask about your service";
    var repromptText = "You can ask about your service";
    response.ask(speechOutput, repromptText);
};

MyMazda.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MyMazda onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MyMazda.prototype.intentHandlers = {
    // register custom intent handlers
    "MyMazdaIntent": function (intent, session, response) {
        response.tellWithCard("Your Mazda is due for a service in 8500 miles, your last service was 4 months ago", "Your Mazda is due for a service in 8500 miles, your last service was 4 months ago", "Your Mazda is due for a service in 8500 miles, your last service was 4 months ago");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask about your service!", "You can ask about your service!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var myMazda = new MyMazda();
    myMazda.execute(event, context);
};
