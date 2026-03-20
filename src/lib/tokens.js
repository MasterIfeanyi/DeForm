import crypto from 'crypto';

// Short human-friendly code: "eFj78ols"
export function generateShortCode(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(length);
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('');
}

// Long cryptographic token: "sjsskhsh...1188282"
export function generateLongToken() {
  return crypto.randomBytes(32).toString('hex'); // 64 char hex string
  // or base64url for a shorter but still strong token:
  // return crypto.randomBytes(32).toString('base64url'); // ~43 chars
}