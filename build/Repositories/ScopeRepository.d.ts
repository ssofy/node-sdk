import { ScopeEntity } from "../Models/Entities/ScopeEntity";
export interface ScopeRepository {
    /**
     * Get list of available OAuth2 Scopes.
     */
    all(lang: string): ScopeEntity[];
}
