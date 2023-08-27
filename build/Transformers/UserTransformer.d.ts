import { Transformers } from ".";
import { Models } from '../Models';
export declare class UserTransformer implements Transformers.Transformer {
    protected columns: {
        [key: string]: string;
    };
    protected additionalColumns: string[];
    constructor(columnMap?: {
        [key: string]: string;
    }, additionalColumns?: string[]);
    transform(data: any): Promise<Models.UserEntity>;
    private get;
}
