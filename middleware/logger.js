export const _logger = async(req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}