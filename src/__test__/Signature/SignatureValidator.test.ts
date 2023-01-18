import {ClientEntity} from "../../Models/ClientEntity";
import {ScopeEntity} from "../../Models/ScopeEntity";
import {UserEntity} from "../../Models/UserEntity";
import {SignatureValidator} from "../../SignatureValidator";
import {ClientConfig} from "../../ClientConfig";
import {Signature} from "../../Models/Signature";

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
                hash: 'c6f9f6eb5868af271bcaae915a515bbefb5e46f4e87a41596270b357b5627f64',
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
                hash: 'c0100920478966fbd8650b10e98ad552a2787a97b51ff77bf4339daa218ddc90',
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
                hash: '2fff5bfa4fc2cf01e6cf7abf5811bd8e2d3c22ffbad55c14c0d918c7fcf4a6f2',
                salt: 'y4HWL',
            }), 'utf8').toString('base64'),
        },
    ];

    test.each(cases)('Signature must match $signature', async (testCase: any) => {
        const ok = await validator.verifyBase64Signature(testCase.url, testCase.params, testCase.signature);
        return expect(ok).toBeTruthy();
    });
});