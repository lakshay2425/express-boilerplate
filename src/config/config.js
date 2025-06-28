const _config = {
    PORT : process.env.PORT || 3000,
    NODE_ENVIRONMENT : process.env.NODE_ENV || 'development',
    dbURI : process.env.DB_URI || 'mongodb://localhost:27017/base'
}


export const config = {
    get(key){
        const value = _config[key];
        if(!value){
            console.error(`Config key "${key}" not found.`);
            process.exit(1);
        }
        return value;
    }
}