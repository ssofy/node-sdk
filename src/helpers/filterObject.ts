export default <T extends Record<string, unknown>>(ref: T, obj: Partial<T>): Partial<T> => {
    const result = {} as Partial<T>;

    for (const key in obj) {
        if (key in ref) {
            result[key] = obj[key];
        }
    }

    return result;
};
