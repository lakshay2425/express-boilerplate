export const validateMissingFields = (fieldsToCheck:string| object):boolean => {
    if (typeof fieldsToCheck !== 'object' || fieldsToCheck === null) {
        // Handle the case where a single variable is passed
        return fieldsToCheck === undefined || fieldsToCheck === null;
    } else {
        // Handle the case where an object (like req.query) is passed
        const missingFields = Object.entries(fieldsToCheck)
            .filter(([, value]) => value === undefined || value === null)
            .map(([field]) => field);
        return missingFields.length > 0;
    }
};