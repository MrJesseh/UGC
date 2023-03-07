var events = require('events');
var eventEmitter = new events.EventEmitter();

class EventHandler {

}

const EventHandlerInstance = new EventHandler();
Object.freeze(EventHandlerInstance);

module.exports = {eventHandler: EventHandlerInstance, emitter: eventEmitter};