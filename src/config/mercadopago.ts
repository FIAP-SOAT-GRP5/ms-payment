const mercadopago = require('mercadopago')

import env from './env';

const mp = mercadopago.configure({
    access_token: env.MP_ACCESS_TOKEN
});

export default mp;
