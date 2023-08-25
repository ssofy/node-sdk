export default (value: any): boolean => {
    return typeof value === 'object' && value.constructor === Object;
};
