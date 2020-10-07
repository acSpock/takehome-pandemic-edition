describe.skip('[Queries Integration]', () => {
    it('Fetches list of properties with city filter', async () => {
        //Asserts query response schema is valid
        //Asserts response is 200
    });

    it('Fetches list of properties without city filter', async () => {
        //Asserts query response schema is valid
        //Asserts response is 200
    });

    it('Fetches list of properties - throws API Error - return error', async () => {
        //Asserts query error field exists
        //Asserts response is 200
    });

    it('Fetches list of properties - incorrect Auth token - return error', async () => {
        //Asserts query error code correct UNAUTHORIZED
        //Asserts response is 400
    });

    it('Fetches list of properties - malformed query payload - return Error', async () => {
        //Asserts query error code is correct GRAPHQL_VALIDATION_FAILED
        //Asserts response is 400
    });

});

describe.skip('[Mutations Integration]', () => {
    it('Add favorite to listings', async () => {
        //Assert query response schema is valid
        //Assert response is 200
    });

    it('Add favorite to listings throw DB Error', async () => {
        //Assert response code error is valid
    });

    it('Add favorite to listings with incorrect field name', async () => {
        //Assert response code error is valid
        //Assert response is 200
    });
});