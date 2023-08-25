import {default as isStringInternal} from "./isString";
import {default as isObjectInternal} from "./isObject";
import {default as isArrayInternal} from "./isArray";
import {default as randomStringInternal} from "./randomString";
import {default as randomDigitsInternal} from "./randomDigits";
import {default as filterObjectInternal} from "./filterObject";
import {default as matchesSchemaInternal} from "./matchesSchema";
import {default as maskEmailAddressInternal} from "./maskEmailAddress";
import {default as maskPhoneNumberInternal} from "./maskPhoneNumber";
import {default as generateSignatureInternal} from "./generateSignature";

export namespace Helpers {
    export const isString = isStringInternal;
    export const isObject = isObjectInternal;
    export const isArray = isArrayInternal;
    export const randomString = randomStringInternal;
    export const randomDigits = randomDigitsInternal;
    export const filterObject = filterObjectInternal;
    export const matchesSchema = matchesSchemaInternal;
    export const maskEmailAddress = maskEmailAddressInternal;
    export const maskPhoneNumber = maskPhoneNumberInternal;
    export const generateSignature = generateSignatureInternal;
}
