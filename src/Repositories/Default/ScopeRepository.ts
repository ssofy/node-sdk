import {Repositories} from "..";
import {Models} from "../../Models";

export class ScopeRepository implements Repositories.ScopeRepository {
    protected scopes: Models.ScopeEntity[];

    constructor(scopes: Models.ScopeEntity[]) {
        this.scopes = scopes;
    }

    async all(lang: string): Promise<Models.ScopeEntity[]> {
        return this.scopes;
    }
}
