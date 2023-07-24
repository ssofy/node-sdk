import {OAuth2Client as BaseOAuth2Client} from "./OAuth2Client/OAuth2Client";
import {OAuth2Config} from "./OAuth2Client/OAuth2Config";

export class OAuth2Client extends BaseOAuth2Client {
    constructor(config: OAuth2Config) {
        super(config);
    }
}
