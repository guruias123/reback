import crypto from 'crypto';

export const secretKey = crypto.randomBytes(64).toString('hex');