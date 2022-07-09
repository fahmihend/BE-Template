import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from '../helpers/config.helper';

export const typeOrmConfig = [
    {
        type: 'mysql',
        host: Config.get('DB_HOST'),
        port: Config.getNumber('DB_PORT'),
        username: Config.get('DB_USERNAME'),
        password: Config.get('DB_PASSWORD'),
        database: Config.get('DB_DATABASE'),
        // keepConnectionAlive: true,
        entities: [__dirname + '/../**/*{.ts,.js}'],
        logging: false,
        synchronize: false,
        // charset: 'utf8mb4',
        // timezone: 'Z',
    } as TypeOrmModuleOptions,
]