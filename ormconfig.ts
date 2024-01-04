/* v8 ignore start */
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from './src/config/database';

ConfigModule.forRoot({
	isGlobal: true,
	load: [dbConfiguration],
});

export default dbConfiguration();
/* v8 ignore stop */