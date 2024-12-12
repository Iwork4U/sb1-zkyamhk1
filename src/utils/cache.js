import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 3600, // 1 hour default TTL
  checkperiod: 120 // Check for expired entries every 2 minutes
});

export const cacheMiddleware = (duration = 3600) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  };
};

export default cache;