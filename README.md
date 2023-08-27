SSOfy Node.js SDK
=============
#### Official [SSOfy](https://www.ssofy.com) Node.js SDK.

Read the full [documentation](https://www.ssofy.com/docs/SDK/NodeJs/Installation/) at SSOfy Knowledge Base.

<img src="docs/img/logo.png"/>

The SSOfy Node SDK includes implementations and wrappers for integrating SSOfy into Node.js frameworks and applications
making it easier to connect with 
your preferred datasource, 
messaging (for sending OTP codes via a wide range of supported providers),
and interact with SSOfy's API.

## Features

- **SSOfy API Interaction:** Easily interact with the SSOfy API to verify tokens and ensure secure communication.

- **Signature Generation and Verification:** Generate and verify request and response signatures to enhance data integrity.

- **Resource Server Applications:** Build resource server applications that efficiently serve data to the SSOfy system.

- **Customizable Transformers:** Convert datasource items into usable objects with the versatile User Transformer.

- **Flexible Filters:** Apply filters such as Default User Filter for scope-based data control (OIDC User Filter coming soon).

- **Convenient Helpers:** Use various helpers like email and phone number maskers, object schema matcher, and more.

- **Diverse Datasource Support:** Connect default repositories to different datasources, including MySQL, Postgres, DynamoDB, MongoDB, and ORMs (Prisma, Sequelize, and Mongoose).

- **Comprehensive Notifiers:** Communicate using SMS platforms (Twilio, Vonage) and email services (SendGrid, Mandrill, SES, etc.).

- **Event Handling:** Handle events seamlessly with support for Node's EventEmitter and Redis Pub/Sub.

### Installing via NPM

```bash
npm i @ssofy/node-sdk -S
```

### Installing via YARN

```bash
yarn add @ssofy/node-sdk
```

## Support

Feel free to reach support with any questions regarding the integration or reporting issues.
Our technical experts are available around the clock to conduct investigations and provide
the highest quality product and service support as quickly as possible.

## Author

SSOfy and derivatives are by [Cubelet Ltd](https://cubelet.co.uk).

## License

The MIT License (MIT). Please see [License](LICENSE) File for more information.
