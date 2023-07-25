import {OAuth2Config} from "../../OAuth2Config";
import {OAuth2ConfigParameters} from "../../OAuth2Client/OAuth2ConfigParameters";
import {OAuth2Client} from "../../OAuth2Client";
import {Storage} from "../../Storage/Storage";
import {FileStorage} from "../../Storage/FileStorage";
import fs from "fs";

describe('Client Test', () => {
    const storagePath = fs.mkdtempSync('/tmp/');
    const stateStore = new FileStorage(storagePath);

    const config = new OAuth2Config(<OAuth2ConfigParameters>{
        url: 'http://sandbox.us.ssofy.local',
        clientId: 'sandbox',
        clientSecret: 'sandbox',
        scopes: ['*'],
        redirectUri: 'https://oauthdebugger.com/debug',
        stateStore: <Storage>stateStore,
    });

    const client = new OAuth2Client(config);

    test('workflow initiation', async () => {
        jest.setTimeout(30000);

        const state = await client.initAuthCodeFlow('http://localhost', 'http://localhost/oauth/continue');
        console.log(state);

        expect(state.state).toBeDefined();
        expect(state.uri).toBeDefined();
    });

    test.skip('workflow continue', async () => {
        jest.setTimeout(30000);

        const state = await client.continueAuthCodeFlow('A918x8p1Sa', '018986cde6437ad6aed2881c4612e6af2fc0156ae07046368b1d21e4ea36cd7e194af072799b488886955e2db475fc23');
        console.log(state);

        expect(true).toBeTruthy();
    });

    test.skip('refresh token', async () => {
        jest.setTimeout(30000);

        const state = await client.getAccessToken('A918x8p1Sa');
        console.log(state);

        expect(true).toBeTruthy();
    });

    test.skip('refresh user info', async () => {
        jest.setTimeout(30000);

        let state;

        state = await client.getUserInfo('A918x8p1Sa');
        console.log(state);

        state = await client.refreshUserInfo('A918x8p1Sa');
        console.log(state);

        expect(true).toBeTruthy();
    });
});
