# CHANGELOG

## 2.4.0 - 2023-08-27

* Decoupled template engines from notifier. (HandlebarsEngine at the moment).
* Added SocialLinkRepository interface.
* Added default (generic) repositories.
* Added mock repositories.
* Added Helpers.
* Added Filters.
* Added Transformers.
* Wrapped the javascript-sdk storage classes.
* Fixed the issue with SignatureGenerator.
* New Datasource:
  - mongodb
  - mongoose
  - dynamodb
  - pg
  - mysql2
  - sequelize
* New Notifiers:
  - Twilio (SMS)
  - Vonage (SMS)
  - SendGrid (Email)
  - SES (Email)
  - Mailgun (Email)
  - Mandrill (Email)
  - Nodemailer (Email/SMTP)
* New Event Channels:
  - Redis (Pub/Sub).
* More Fixes.

## 2.3.0 - 2023-08-15

* Added EventManager feature under Events namespace.
* Added Notifier feature under Notifications namespace.
* Added Connection type under Datasource namespace.
* Merged Entities namespace into Models namespace.
* Improved types in model and repository interfaces.

## 2.2.0 - 2023-08-06

* Wrapped models under Models namespace.
* Wrapped entity models under Entities namespace.
* Wrapped repository interfaces under Repositories namespace.
* Fixed the user property type in AuthResponseEntity.
* Fixed the return type with UserRepository::createToken().

## 2.1.1 - 2023-07-30

* Switched to javascript-sdk as the OAuth2 client library.

## 2.1.0 - 2023-07-25

* **New:** OAuth2Client and OAuth2Config.
* Deprecated the old SignatureValidator and APIConfig dependency for SignatureVerifier.
* Changed the return types in repositories to promise.

## 2.0.1 - 2023-07-22

* Repository interfaces have been added useful to resource server integrations. 

## 2.0.0 - 2023-06-08

* Renamed the `Client` to `APIClient` and `ClientConfig` to `APIConfig` for readability.
* Fixed the token cache invalidation issue.

## 1.1.8 - 2023-06-01

* Added the missing `username` property in UserEntity

## 1.1.7 - 2023-05-29

* Added the missing UserEntity properties

## 1.1.6 - 2023-03-19

* Switched to the new User Resource endpoint

## 1.1.5 - 2023-02-28

* Compliance with Draft 1.30 signature style
* Entity models directory restructure and fixes

## 1.1.4 - 2023-02-11

* Added UserEntity missing properties

## 1.1.3 - 2023-02-04

* Added OTPOptionEntity missing properties

## 1.1.2 - 2023-01-24

* Added UserEntity missing properties

## 1.1.0 - 2023-01-19

* Added OTPOptionEntity model
* Added the missed "hash" property to UserEntity model
* Excluded __test__ directory from the build output

## 1.0.0 - 2022-12-16

* First Release
