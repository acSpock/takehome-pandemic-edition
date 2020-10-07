const { RESTDataSource } = require('apollo-datasource-rest');

class SimplyRETSClient extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.simplyrets.com/';
        this.basicAuth = `Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz`;
    }

    async getProperties() {
        return this.get(`/properties`);
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.basicAuth);
    }
}

module.exports = SimplyRETSClient;