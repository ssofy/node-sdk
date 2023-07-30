import {OAuth2Config as BaseOAuth2Config, OAuth2ConfigParameters} from "@ssofy/javascript-sdk";

export class OAuth2Config extends BaseOAuth2Config {
    constructor(params: OAuth2ConfigParameters) {
        super(params);
    }
}
