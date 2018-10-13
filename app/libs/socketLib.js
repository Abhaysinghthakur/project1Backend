/**modules dependencies. */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const ChatModel = mongoose.model("Chat");
const ChatRoomModel = mongoose.model('ChatRoom')
const redisLib = require('./redisLib');

// const redisLib = require("./redisLib.js");

let setServer = (server) => {
    let io = socketio.listen(server)

    let myIo = io.of('/');

    myIo.on('connection', (socket) => {
    });
}


module.exports = {
    setServer: setServer
}