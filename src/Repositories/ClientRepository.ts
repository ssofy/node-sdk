import {Models} from "../Models";

export interface ClientRepository {
    /**
     * Get OAuth2 Client by id.
     */
    findById(id: string): Promise<Models.ClientEntity | null>;
}
