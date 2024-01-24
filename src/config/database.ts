/* v8 ignore start */
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import env from './env';

export function getDbConfig(): TypeOrmModuleOptions {
	return {
		type: env.DB_TYPE,
		host: env.DB_HOST,
		port: env.DB_PORT,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		migrationsTableName: 'migration',
		migrations: [
			__dirname + '/../database/migrations/**/*{.ts,.js}',
		],
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		synchronize: false,
		migrationsRun: true,
		namingStrategy: new SnakeNamingStrategy(),
		logging: true,
	};
}

export function getMongoConfig() {
	return  `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@localhost:${env.MONGO_PORT}`;
}

export default registerAs(
	'database',
	() => ({
		...getDbConfig(),
	})
);
/* v8 ignore stop */