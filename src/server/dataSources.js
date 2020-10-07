const SimplyRETSClient = require('../data-sources/simplyrets');
module.exports = () => {
    return {
        SimplyRETSClient: new SimplyRETSClient()
    };
};