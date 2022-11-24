const { Subscribe, Unsubscribe, CountSubscribers, error } = require("./types");

const Subscribe_ = () => {
  const message = JSON.stringify({
    "type": Subscribe,
    "status": "Subscribed",
    "updateAt": new Date().toTimeString(),
  });
  return message;
};

const Unsubscribe_ = () => {
  const message = JSON.stringify({
    "type": Unsubscribe,
    "status": "Unsubscribed",
    "updateAt": new Date().toTimeString(),
  });
  return message;
};

const CountSubscribers_ = (count) => {
  const message = JSON.stringify({
    "type": CountSubscribers,
    "count": count,
    "updateAt": new Date().toTimeString(),
  });
  return message;
};

const TypeError = () => {
  const message = JSON.stringify({
    "type": error,
    "error": "Bad formatted payload, non JSON",
    "updatedAt": new Date().toTimeString(),
  });
  return message;
}

const otherReq = () => {
  const message = JSON.stringify({
    "type": error,
    "error": "Requested method not implemented",
    "updatedAt": new Date().toTimeString(),
  });
  return message;
}

module.exports = {
  Subscribe_,
  Unsubscribe_,
  CountSubscribers_,
  TypeError,
  otherReq,
}