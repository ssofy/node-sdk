import {Repositories} from "..";
import {Models} from "../../Models";

export class ScopeRepository implements Repositories.ScopeRepository {
    async all(lang: string): Promise<Models.ScopeEntity[]> {
        return [
            {
                id: '*',
                title: 'All data',
            }
        ];
    }
}
