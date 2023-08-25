import {Repositories} from "..";
import {Models} from "../../Models";

export class ClientRepository implements Repositories.ClientRepository {
    async findById(id: string): Promise<Models.ClientEntity | null> {
        if (id !== 'test') {
            return null;
        }

        return {
            id: 'test',
            name: 'Test',
            secret: 'test',
            redirect_uris: ['*'],
        }
    }
}
