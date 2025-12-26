interface Config {
    PORT: number;
    NODE_ENVIRONMENT: string;
    dbURI: string;
    JWT_PUBLIC_KEY: string,
    BYPASS_AUTH: string,
    TEST_USER_EMAIL: string
}

const _config: Config = {
    PORT: Number(process.env.PORT),
    NODE_ENVIRONMENT: process.env.NODE_ENV || 'development',
    dbURI: process.env.DB_URI || 'mongodb://localhost:27017/base',
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || "your-default-public-key",
    BYPASS_AUTH: process.env.BYPASS_AUTH || "false",
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || "your-test-email"
}


export const config = {
    get<K extends keyof Config>(key: K): Config[K] {  // Generic K ensures exact return type
        const value = _config[key];
        if (value === undefined || value === null) {
            console.error(`Config key "${key}" not found.`);
            process.exit(1);
        }
        return value;
    }
}