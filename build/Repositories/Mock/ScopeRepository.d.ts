import { Repositories } from "..";
import { Models } from "../../Models";
export declare class ScopeRepository implements Repositories.ScopeRepository {
    all(lang: string): Promise<Models.ScopeEntity[]>;
}
