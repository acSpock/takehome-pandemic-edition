const { User } = require('../models');
const basicAuthenticate = (req, res, next) => {
    const header = req.get('authorization') || '';
    if(!header){
        req.isAuth = false;
    }
    const token = header && header.split('Bearer ')[1];
    /**
     * This is obviously super simplified, a real production implementation of a jwt authenticating
     * system would have jwt signing and validation using a library like bcrypt or something similar.
     * Or if you were going to use actual Basic Auth, you would need to randomly salt, encrypt and store the hash
     **/
    User.findOne({token:token}, (err, user) => {
        if(err || !user){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        return next();
    });

}
module.exports = basicAuthenticate;