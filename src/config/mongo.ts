/* v8 ignore start */
import env from './env';

export function getMongoConfig() {
	return env.DATABASE_URL ?? '';
}

/* v8 ignore stop */