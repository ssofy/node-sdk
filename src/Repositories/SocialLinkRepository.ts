import {Models} from "../Models";

export interface SocialLinkRepository {
    /**
     * Find social link by provider and the unique provider user identifier.
     * Returns the user id in system.
     */
    getUserId(provider: string, identifier: string): Promise<string | null>;

    /**
     * Create link between the unique provider user identifier and the user id in system.
     */
    link(provider: string, identifier: string, userId: string): Promise<void>;
}
