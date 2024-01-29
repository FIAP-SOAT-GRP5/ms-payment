/* v8 ignore start */
import { config } from 'dotenv';
import { z } from 'zod';

config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	TZ: z.string().default('America/São Paulo'),
	PORT: z.coerce.number().default(3000),

	QUEUE_CREATE_ORDER_URL: z.string(),
	MP_ACCESS_TOKEN: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
});

const envTestSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	TZ: z.string().default('America/São Paulo'),
	PORT: z.coerce.number().default(3000),

	QUEUE_CREATE_ORDER_URL: z.string().optional(),
	MP_ACCESS_TOKEN: z.string().optional(),
	AWS_ACCESS_KEY_ID: z.string().optional(),
	AWS_SECRET_ACCESS_KEY: z.string().optional(),
	AWS_REGION: z.string().optional(),
});

const getEnv = () => {
	if (process.env.NODE_ENV === 'test') return envTestSchema.parse(process.env);
	return envSchema.parse(process.env);
};

const env = getEnv();

export default env;
/* v8 ignore stop */
