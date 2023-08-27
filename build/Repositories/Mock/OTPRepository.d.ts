import { Repositories } from "..";
import { Models } from "../../Models";
export declare class OTPRepository implements Repositories.OTPRepository {
    destroyVerificationCode(optionId: string, code: string, ip?: string): Promise<void>;
    findAllByAction(userId: string, action: string, ip?: string): Promise<Models.OTPOptionEntity[]>;
    findById(optionId: string, ip?: string): Promise<Models.OTPOptionEntity | null>;
    newVerificationCode(option: Models.OTPOptionEntity, ip?: string): Promise<string>;
    verify(optionId: string, code: string, ip?: string): Promise<boolean>;
    private options;
}
