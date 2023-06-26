import { CallHandler } from "../proxyHandlers/callHandler.js";
import { GetHandler } from "../proxyHandlers/getHandler.js";
import { SetHandler } from "../proxyHandlers/setHandler.js";
import { CallSubscriber } from "../subscribers/callSuscriber.js";
import { GetSubscriber } from "../subscribers/getSuscriber.js";
import { SetSubscriber } from "../subscribers/setSuscriber.js";
import { logToConsole } from "../transformers/stdin.js";

export function makeHandlersFactory() {
  const getSubject = new GetSubscriber();
  getSubject.subscribe(logToConsole);

  const setSubject = new SetSubscriber();
  setSubject.subscribe(logToConsole);

  const callSubject = new CallSubscriber();
  callSubject.subscribe(logToConsole);

  return {
    get: new GetHandler({ subscriber: getSubject }),
    set: new SetHandler({ subscriber: setSubject }),
    call: new CallHandler({ subscriber: callSubject }),
  };
}
