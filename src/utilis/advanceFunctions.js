export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


//Database operation wrapper
export const dbOperation = async (operation, errorMessage) => {
    try {
        return await operation();
    } catch (error) {
        console.error(`DB Error: ${errorMessage}`, error.message);
        throw createError(errorMessage, 500);
    }
};

//External service wrapper
const serviceOperation = async (operation, errorMessage) => {
    try {
        return await operation();
    } catch (error) {
        console.error(`Service Error: ${errorMessage}`, error.message);
        throw createError(errorMessage, 500);
    }
};
