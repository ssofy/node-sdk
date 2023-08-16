import * as EventManagerInternal from "./EventManager";
import * as DefaultEventManagerInternal from "./DefaultEventManager";
import * as RedisEventManagerInternal from "./RedisEventManager";

export namespace Events {
    export import EventManager = EventManagerInternal.EventManager;
    export import DefaultEventManager = DefaultEventManagerInternal.DefaultEventManager;
    export import RedisEventManager = RedisEventManagerInternal.RedisEventManager;
}
