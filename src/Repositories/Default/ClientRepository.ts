import {Repositories} from "..";
import {Models} from "../../Models";

export class ClientRepository implements Repositories.ClientRepository {
    protected clients: Models.ClientEntity[];

    constructor(clients: Models.ClientEntity[]) {
        this.clients = clients;
    }

    async findById(id: string): Promise<Models.ClientEntity | null> {
        const clients: Models.ClientEntity[] = this.clients;

        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === id) {
                return clients[i];
            }
        }

        return null;
    }
}
