import { Ngrok } from '@ngrok/ngrok-api';

import env from './env';

const ngrok = new Ngrok({
    baseUrl: "https://api.ngrok.com",
    apiToken: env.NGROK_API_KEY,
})

export default ngrok;