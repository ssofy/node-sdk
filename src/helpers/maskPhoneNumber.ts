export default (phone: string): string => {
    return '*'.repeat(phone.length - 2) + phone.slice(-2);
};
