interface Config {
    PORT: number;
    NODE_ENVIRONMENT: string;
    dbURI: string;
}

const _config:Config = {
    PORT : Number(process.env.PORT),
    NODE_ENVIRONMENT : process.env.NODE_ENV || 'development',
    dbURI : process.env.DB_URI || 'mongodb://localhost:27017/base'
}


export const config = {
        get<K extends keyof Config>(key: K): Config[K] {  // Generic K ensures exact return type
        const value = _config[key];
        if(!value){
            console.error(`Config key "${key}" not found.`);
            process.exit(1);
        }
        return value;
    }
}