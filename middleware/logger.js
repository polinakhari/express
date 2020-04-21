const moment = require("moment")
//Create a middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format()}`);
    next();
}
// answer http://localhost:5000/api/members
module.exports = logger;