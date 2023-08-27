import { Repositories } from "..";
import { Models } from "../../Models";
export declare class ClientRepository implements Repositories.ClientRepository {
    protected clients: Models.ClientEntity[];
    constructor(clients: Models.ClientEntity[]);
    findById(id: string): Promise<Models.ClientEntity | null>;
}
