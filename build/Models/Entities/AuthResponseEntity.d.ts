import { TokenEntity } from "./TokenEntity";
export interface AuthResponseEntity {
    user: string;
    token?: TokenEntity;
}
