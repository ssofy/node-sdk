import {SignatureValidator} from "../../SignatureValidator";
import {ClientConfig} from "../../ClientConfig";
import {Signature} from "../../Models/Signature";
import {ClientEntity} from "../../Models/Entities/ClientEntity";
import {ScopeEntity} from "../../Models/Entities/ScopeEntity";
import {UserEntity} from "../../Models/Entities/UserEntity";

describe('SignatureValidator Test', () => {
    const validator = new SignatureValidator(<ClientConfig>{
        'key': 'cf47d697-cc0b-4262-8329-78a0995e6fd0',
        'secret': 'lXp2rNYg8ht75l2l1vxNGNz2PWzZ7h6K',
    });

    const cases = [
        {
            url: 'https://example.com/external/ssofy/client',
            params: {
                ...<ClientEntity>{
                    id: 'test-client',
                    name: 'Test Client',
                    secret: 'cvg7oVzKM6g6Z4Nm',
                    redirect_uris: ['*'],
                },
            },
            signature: Buffer.from(JSON.stringify(<Signature>{
                hash: 'e3a375e05b73cb7ceede92e1b43f8369015375dc4a20f6ccc89b880740f75328',
                salt: 'Py2BZIGgY',
            }), 'utf8').toString('base64'),
        },
        {
            url: 'https://example.com/external/ssofy/scopes',
            params: {
                scopes: [
                    <ScopeEntity>{
                        id: '*',
                        title: 'everything',
                    },
                    <ScopeEntity>{
                        id: 'profile',
                        title: 'profile',
                    }
                ],
            },
            signature: Buffer.from(JSON.stringify(<Signature>{
                hash: '9b3084c44f162dee2349c8682e8ba5b94f141a8ceb9bdce4cf82e5eab845c635',
                salt: 'qHzBkp',
            }), 'utf8').toString('base64'),
        },
        {
            url: 'https://example.com/external/ssofy/user',
            params: {
                user: <UserEntity>{
                    id: 'test-user',
                    hash: 'test-user',
                    display_name: 'test@example.com',
                },
            },
            signature: Buffer.from(JSON.stringify(<Signature>{
                hash: '2128e658770e9e5292f01a0dd52e766cd48c143240a10671a9cca83a60e3d204',
                salt: 'y4HWL',
            }), 'utf8').toString('base64'),
        },
    ];

    test.each(cases)('Signature must match $signature', async (testCase: any) => {
        const ok = await validator.verifyBase64Signature(testCase.url, testCase.params, testCase.signature);
        return expect(ok).toBeTruthy();
    });
});