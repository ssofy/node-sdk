import {Models} from "../Models";

export interface ScopeRepository {
    /**
     * Get list of available OAuth2 Scopes.
     */
    all(lang: string): Promise<Models.ScopeEntity[]>;
}
