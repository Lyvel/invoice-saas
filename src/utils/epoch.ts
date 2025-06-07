/**
 * @returns epoch time in seconds
 */
export const getTimeInEpoch = () => {
    return Math.floor(Date.now() / 1000).toString();
};
