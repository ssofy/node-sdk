import * as ChannelInternal from "./Channel";
import * as NodeChannelInternal from "./NodeChannel";
import * as RedisChannelInternal from "./RedisChannel";

export namespace Events {
    export import EventChannel = ChannelInternal.Channel;
    export import NodeEventChannel = NodeChannelInternal.NodeChannel;
    export import RedisEventChannel = RedisChannelInternal.RedisChannel;
}
