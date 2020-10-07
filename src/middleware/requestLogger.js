/**
 * Logger Middleware to log request information
 */
const requestLogger = (req, res, next) => {
    //Add any logging information pre auth. For production apps would use a logger like winston
    console.log(`Incoming Request ${Date(Date.now().toString())}`);
    next();
}
module.exports = requestLogger;