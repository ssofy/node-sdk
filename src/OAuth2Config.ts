import {OAuth2Config as BaseOAuth2Config} from "./OAuth2Client/OAuth2Config";
import {OAuth2ConfigParameters} from "./OAuth2Client/OAuth2ConfigParameters";

export class OAuth2Config extends BaseOAuth2Config {
    constructor(params: OAuth2ConfigParameters) {
        super(params);
    }
}
