import { CallHandler } from "../proxyHandlers/callHandler";
import { GetHandler } from "../proxyHandlers/getHandler";
import { SetHandler } from "../proxyHandlers/setHandler";
import { CallSubscriber } from "../subscribers/callSuscriber";
import { GetSubscriber } from "../subscribers/getSuscriber";
import { SetSubscriber } from "../subscribers/setSuscriber";
import { logToConsole } from "../transformers/stdin";

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
