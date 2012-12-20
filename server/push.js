/**
 * Created with JetBrains WebStorm.
 * User: zyz
 * Date: 12-10-24
 * Time: 下午3:27
 * what how why
 */
var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , amqp = require('amqp')
    , events = require("events");


//HTTPServer listening on port 80
app.listen(8888);
//RabbitMQ listening on localhost
var messageConnection = amqp.createConnection({host:"localhost"});
var newMessageEvent = new events.EventEmitter();
var messageList = new Array();

function handler(req, res) {
    fs.readFile(__dirname + '/message.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}
messageConnection.on('ready', function () {
    console.log("connection to RabbitMQ is ready");
    messageConnection.queue('java', function (queue) {
        console.log('Queue ' + queue.name + ' is open');
        queue.bind('#');

        queue.subscribe(function (message) {
            console.log(JSON.stringify(new String(message.data)));
            var messageFromJava = new String(message.data);
            messageList.push(messageFromJava);
            newMessageEvent.emit("newMessages");
        });
    });
});


io.sockets.on('connection', function (socket) {
    newMessageEvent.on("newMessages", function () {
        console.log("Preparing to send messages " + JSON.stringify(messageList));
        socket.emit('news', messageList);
    });

    if(messageList.length != 0){
        socket.emit('news', messageList);
        messageList.length = 0;
    }
//    socket.emit('news', "test");
});
