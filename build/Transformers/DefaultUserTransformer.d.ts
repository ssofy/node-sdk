import { Transformers } from ".";
import { Models } from '../Models';
export declare class DefaultUserTransformer implements Transformers.UserTransformer {
    protected columns: {
        [key: string]: string;
    };
    protected additionalColumns: string[];
    constructor(columnMap?: {
        [key: string]: string;
    }, additionalColumns?: string[]);
    transform(user: any): Promise<Models.UserEntity>;
    private get;
}
