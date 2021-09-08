import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
import * as config from 'config';
// import * as dotenv from 'dotenv';
require('dotenv').config()

const dbConfig = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || process.env.DATABASE_HOST || dbConfig.databasehost,
    port: process.env.RDS_PORT || process.env.DATABASE_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || process.env.DATABASE_USER || dbConfig.username,
    password: process.env.RDS_PASSWORD || process.env.DATABASE_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || process.env.DATABASE_NAME || dbConfig.database,
    entities: [
        Task,
        User
    ],
    synchronize: process.env.SYNC || dbConfig.synchronize, 
};