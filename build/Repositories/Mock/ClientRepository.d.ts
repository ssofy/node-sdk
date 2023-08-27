import { Repositories } from "..";
import { Models } from "../../Models";
export declare class ClientRepository implements Repositories.ClientRepository {
    findById(id: string): Promise<Models.ClientEntity | null>;
}
