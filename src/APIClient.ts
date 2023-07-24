import {APIClient as BaseAPIClient} from "./APIClient/APIClient";
import {APIConfig} from "./APIConfig";

export class APIClient extends BaseAPIClient {
    constructor(config: APIConfig) {
        super(config);
    }
}
