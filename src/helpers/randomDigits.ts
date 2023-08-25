import {randomInt} from "crypto";

export default (digits: number): string => {
    let result = '';

    while (result.length < digits) {
        result += randomInt(0, 9).toString();
    }

    return result;
};
