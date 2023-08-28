import * as JavascriptSDK from "@ssofy/javascript-sdk";

export namespace Storage {
    export import Storage = JavascriptSDK.Storage;
    export import NullStorage = JavascriptSDK.NullStorage;
    export import MemoryStorage = JavascriptSDK.MemoryStorage;
    export import FileStorage = JavascriptSDK.FileStorage;
}
