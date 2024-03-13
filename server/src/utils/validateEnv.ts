import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port()
});

export default env;