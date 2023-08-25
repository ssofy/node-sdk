export default (value: any): boolean => {
    return (value instanceof Array) && value.constructor !== Object;
};
