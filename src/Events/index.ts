import * as EventManagerInternal from "./EventManager";
import * as DefaultEventManagerInternal from "./DefaultEventManager";

export namespace Events {
    export import EventManager = EventManagerInternal.EventManager;
    export import DefaultEventManager = DefaultEventManagerInternal.DefaultEventManager;
}
