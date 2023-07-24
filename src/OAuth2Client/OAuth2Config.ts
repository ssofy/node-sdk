import {Storage} from "../Storage/Storage";
import {OAuth2ConfigParameters} from "./OAuth2ConfigParameters";

export class OAuth2Config implements OAuth2ConfigParameters {
    url?: string;
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    pkceVerification?: boolean;
    timeout?: number;
    scopes?: string[];
    locale?: string;
    stateStore?: Storage;
    stateTtl?: number;

    constructor(params: OAuth2ConfigParameters) {
        Object.assign(this, params);

        this.pkceVerification = this.pkceVerification ?? true;
        this.timeout = this.timeout ?? 60 * 60; // default: 1 hour
        this.scopes = this.scopes ?? ['*'];
        this.locale = this.locale ?? 'en';
        this.stateTtl = this.stateTtl ?? 60 * 60 * 24 * 365; // default: 1 year
    }

    authorizationUrl(token?: string): string | null {
        if (!this.url) {
            return null;
        }

        let params: { [key: string]: any } = {}

        if (token) {
            params['token'] = token;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/authorize'), params);
    }

    socialAuthorizationUrl(provider: string): string | null {
        if (!this.url) {
            return null;
        }

        provider = provider.toLowerCase();

        return this.addUrlParams(this.urlJoin(this.url, `/social/${provider}/authorize`));
    }

    tokenUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/token'));
    }

    logoutUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/logout'), {
            redirect_uri: this.redirectUri
        });
    }

    logoutEverywhereUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/logout-everywhere'), {
            redirect_uri: this.redirectUri,
        });
    }

    registrationUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/register'), {
            redirect_uri: this.redirectUri,
        });
    }

    profileUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.addUrlParams(this.urlJoin(this.url, '/account'));
    }

    resourceOwnerUrl(): string | null {
        if (!this.url) {
            return null;
        }

        return this.urlJoin(this.url, '/userinfo');
    }

    toJson(): any {
        let data = {...this};
        delete data.stateStore;

        return data;
    }

    private addUrlParams(url: string, extraParams: { [key: string]: any } = {}): string {
        let params = extraParams;

        let locale: string | undefined = this.locale;

        if (locale) {
            params['locale'] = locale;
        }

        if (Object.keys(params).length > 0) {
            let urlObj = new URL(url);
            Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]));
            url = urlObj.toString();
        }

        return url;
    }

    private urlJoin(url: string, path: string): string {
        let urlObj = new URL(url);
        urlObj.pathname = path;
        return urlObj.toString();
    }
}
