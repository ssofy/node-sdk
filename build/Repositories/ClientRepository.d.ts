import { ClientEntity } from "../Models/Entities/ClientEntity";
export interface ClientRepository {
    /**
     * Get OAuth2 Client by id.
     */
    findById(id: string): ClientEntity;
}
