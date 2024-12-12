export const GODADDY_API_CONFIG = {
  baseUrl: 'https://api.godaddy.com/v1',
  headers: {
    'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
    'Content-Type': 'application/json'
  }
};