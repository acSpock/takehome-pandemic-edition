const { AuthenticationError } = require('apollo-server-express');
const models = require('../models');

const context = ({req}) => {
    if(!req.isAuth){
        throw new AuthenticationError("Must be authenticated");
    }
    return {
        models
    }
}

module.exports = context;