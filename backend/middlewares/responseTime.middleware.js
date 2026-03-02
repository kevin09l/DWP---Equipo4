// simple middleware that measures request duration and adds header
export const responseTime = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    res.setHeader('X-Response-Time', `${duration}ms`);
    // optionally log slow endpoints
    if (duration > 500) {
      console.warn(`Slow response (${duration}ms) ${req.method} ${req.originalUrl}`);
    }
  });
  next();
};
