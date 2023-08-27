import { Models } from "../Models";
export interface UserTransformer {
    transform(user: any): Promise<Models.UserEntity>;
}
