import ApplyHandler from "./applyHandler";
import GetAndCallHandler from "./getAndCallHandler";
import SetHandler from "./setHandler";

export const handlersMap: { [k: string]: any } = {
  getAndCall: GetAndCallHandler,
  set: SetHandler,
  apply: ApplyHandler,
};
