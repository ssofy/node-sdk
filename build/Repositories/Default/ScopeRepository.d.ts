import { Repositories } from "..";
import { Models } from "../../Models";
export declare class ScopeRepository implements Repositories.ScopeRepository {
    protected scopes: Models.ScopeEntity[];
    constructor(scopes: Models.ScopeEntity[]);
    all(lang: string): Promise<Models.ScopeEntity[]>;
}
