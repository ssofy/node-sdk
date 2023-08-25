import {randomBytes} from "crypto";

export default (length: number): string => {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};
