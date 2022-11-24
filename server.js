const { Subscribe_, Unsubscribe_, CountSubscribers_, TypeError, otherReq } = require("./util");
const { Subscribe, Unsubscribe, CountSubscribers } = require('./types');

const { Server } = require('ws');

const wss = new Server({port: 8080});

// Creating connection using websocket
wss.on("connection", ws => {
  console.log("new client connected");
  let count = 0;
  ws.on('message', data => {
    let request = JSON.parse(data);
    let msg;
    // In case of NOT JSON FORMAT
    if(typeof request !== 'object') {
      msg = TypeError();
      ws.send(msg);
    } else {
      switch (request.type) {
        case Subscribe: 
          msg = Subscribe_();
          setTimeout(() => {
            ws.send(msg);
            count++;
          }, 4000);
          break;
        case Unsubscribe:
          msg = Unsubscribe_();
          setTimeout(() => {
          ws.send(msg);
          count--;
          }, 8000);
          break;
        case CountSubscribers:
          msg = CountSubscribers_(count);
          ws.send(msg);
          break;
        default:
           msg = otherReq();
           ws.send(msg);
      }    
    }
  });

  // handling what to do when clients disconnects from server
  ws.on('close', () => {
    console.log('the client has disconnected');
  });

  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  }
});

 // producing heartbeat messages every second
// setInterval(() => {
//   wss.clients.forEach(client => {
//     const data = JSON.stringify({
//       "type": 'heatbeat',
//       "updatedAt": new Date().toTimeString(),
//     });
//     client.send(data);
//   });
// }, 1000);

console.log("The WebSocket server is running on port 8080");