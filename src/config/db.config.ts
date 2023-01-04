import './envConfig';
const Mongo_Key = process.env.Mongo_Key || '';
const MONGO_PASSSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';

const MONGO_URL = Mongo_Key;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo : {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}


