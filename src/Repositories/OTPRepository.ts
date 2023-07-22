import {OTPOptionEntity} from "../Models/Entities/OTPOptionEntity";

export interface OTPRepository {
    /**
     * Get list of OTP options for the requested action.
     */
    findAllByAction(userId: string, action: string, ip?: string): OTPOptionEntity[]

    /**
     * Find OTP Option by id.
     */
    findById(optionId: string, ip?: string): OTPOptionEntity | null;

    /**
     * Generate and store a new OTP code for the selected option.
     * Returns the generated code.
     */
    newVerificationCode(option: OTPOptionEntity, ip?: string): string;

    /**
     * Expire a previously generated OTP.
     */
    destroyVerificationCode(optionId: string, code: string, ip?: string): void;

    /**
     * Verify validity of the code.
     */
    verify(optionId: string, code: string, ip?: string): boolean;
}