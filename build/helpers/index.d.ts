export declare namespace Helpers {
    const isString: (value: any) => boolean;
    const isObject: (value: any) => boolean;
    const isArray: (value: any) => boolean;
    const randomString: (length: number) => string;
    const randomDigits: (digits: number) => string;
    const filterObject: <T extends Record<string, unknown>>(ref: T, obj: Partial<T>) => Partial<T>;
    const matchesSchema: (obj: any, schema: any) => boolean;
    const maskEmailAddress: (email: string) => string;
    const maskPhoneNumber: (phone: string) => string;
    const generateSignature: (secret: string, path: string, data: any) => Promise<string>;
}
