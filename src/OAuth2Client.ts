import {OAuth2Client as BaseOAuth2Client} from "@ssofy/javascript-sdk";
import {OAuth2Config} from "./OAuth2Config";

export class OAuth2Client extends BaseOAuth2Client {
    constructor(config: OAuth2Config) {
        super(config);
    }
}
