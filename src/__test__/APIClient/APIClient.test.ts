import {APIClient} from "../../APIClient";
import {APIConfig} from "../../APIConfig";

describe('Client Test', () => {
    const config = new APIConfig({
        'domain' : 'test.api.ssofy.local',
        'key'    : 'cf47d697-cc0b-4262-8329-78a0995e6fd0',
        'secret' : 'lXp2rNYg8ht75l2l1vxNGNz2PWzZ7h6K',
        'secure' : false,
    });

    const client = new APIClient(config);

    test.skip('token verification', async () => {
        jest.setTimeout(30000);

        const response = await client.verifyAuthentication('0184f38cfe53715880bdc64415face01ea401c6a0c2b4da0a1f98a2104c7a7e1');

        console.log(response);

        expect(true).toBeTruthy();
    });

    test.skip('resource owner', async () => {
        jest.setTimeout(30000);

        const response = await client.authenticatedUser('0184f38cfe53715880bdc64415face01ea401c6a0c2b4da0a1f98a2104c7a7e1');

        console.log(response);

        expect(true).toBeTruthy();
    });
});