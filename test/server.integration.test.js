const { Subscribe_, Unsubscribe_, CountSubscribers_, TypeError, otherReq } = require("./util");
const { Subscribe, Unsubscribe, CountSubscribers } = require('./types');

describe('Websocket server test', () => {
  let count;
  test('subscribe test', () => {
    count++; 
    expect(Subscribe_()).toBe(
      {
        "type": Subscribe,
        "status": "Subscribed",
        "updateAt": new Date().toTimeString(),
      }
    );
  });
  test('unsubscribe test', () => {
    count--; 
    expect(Unsubscribe_()).toBe(
      {
        "type": Unsubscribe,
        "status": "Unsubscribed",
        "updateAt": new Date().toTimeString(),
      }
    );
  });
  test('countsubscribers test', () => { 
    expect(CountSubscribers_()).toBe(
      {
        "type": CountSubscribers,
        "count": count,
        "updateAt": new Date().toTimeString(),
      }
    );
  });
  test('not json', () => { 
    expect(TypeError()).toBe(
      {
        "type": error,
        "error": "Bad formatted payload, non JSON",
        "updatedAt": new Date().toTimeString(),
      }
    )
  });
  test('not defined request type', () => { 
    expect(otherReq()).toBe(
      {
        "type": error,
        "error": "Requested method not implemented",
        "updatedAt": new Date().toTimeString(),
      }
    )
  });
});
