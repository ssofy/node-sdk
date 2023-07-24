import {APIConfig as BaseAPIConfig} from "./APIClient/APIConfig";
import {APIConfigParameters} from "./APIClient/APIConfigParameters";

export class APIConfig extends BaseAPIConfig {
    constructor(config: APIConfigParameters) {
        super(config);
    }
}
