import { registerAs } from '@nestjs/config';

export default registerAs( 'imagekit', () => ( {
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
} ) );