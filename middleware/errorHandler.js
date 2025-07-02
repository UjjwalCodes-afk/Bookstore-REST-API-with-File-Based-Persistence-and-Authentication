export const errorHandler = async(err, req,res, next) => {
    console.log(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        message : req.message || 'Internal server error'
    })
}