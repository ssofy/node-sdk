import {Models} from "../Models";

export interface OTPRepository {
    /**
     * Get list of OTP options for the requested action.
     */
    findAllByAction(userId: string, action: string, ip?: string): Promise<Models.OTPOptionEntity[]>

    /**
     * Find OTP Option by id.
     */
    findById(optionId: string, ip?: string): Promise<Models.OTPOptionEntity | null>;

    /**
     * Generate and store a new OTP code for the selected option.
     * Returns the generated code.
     */
    newVerificationCode(option: Models.OTPOptionEntity, ip?: string): Promise<string>;

    /**
     * Expire a previously generated OTP.
     */
    destroyVerificationCode(optionId: string, code: string, ip?: string): Promise<void>;

    /**
     * Verify validity of the code.
     */
    verify(optionId: string, code: string, ip?: string): Promise<boolean>;
}
