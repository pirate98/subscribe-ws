var connection = null;
var clientID = 0;

const connect = () => {
  var serverUrl;
  var scheme = "ws";

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (document.location.protocol === "https:") {
    scheme += "s";
  }

  serverUrl = scheme + "://" + "localhost" + ":8080";

  connection = new WebSocket(serverUrl, "json");
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function (evt) {
    console.log("***ONOPEN");
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function (evt) {
    console.log("***ONMESSAGE");
    var msg = JSON.parse(evt.data);
    console.log("Message received: ");
    console.dir(msg);

    switch (msg.type) {
      case "Subscribe":
        console.log(msg.status);
        break;
      case "Unsubscribe":
        console.log(msg.status);
        break;
      case "CountSubscribers":
        console.log(msg.count);
        break;
      case "error":
        console.log(msg.error);
        break;
    }
  };
  console.log("***CREATED ONMESSAGE");
};

function subscribe() {
  console.log("Subscribe sent");
  var msg = {
    type: "Subscribe",
  };
  connection.send(JSON.stringify(msg));
}

function unSubscribe() {
  console.log("Unsubscribe sent");
  var msg = {
    type: "Unsubscribe",
  };
  connection.send(JSON.stringify(msg));
}

function countSubscribers() {
  console.log("Subscribe sent");
  var msg = {
    type: "CountSubscribers",
  };
  connection.send(JSON.stringify(msg));
}
