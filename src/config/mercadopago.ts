const mercadopago = require('mercadopago')

import env from './env';

mercadopago.configure({
    access_token: env.MP_ACCESS_TOKEN
});

export default mercadopago;
