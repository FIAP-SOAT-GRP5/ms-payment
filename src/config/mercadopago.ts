/* v8 ignore start */
import * as mercadopago from 'mercadopago';
import env from './env';
console.log('env.MP_ACCESS_TOKEN', env.MP_ACCESS_TOKEN)
mercadopago.configure({
	access_token: env.MP_ACCESS_TOKEN
});
/* v8 ignore stop */