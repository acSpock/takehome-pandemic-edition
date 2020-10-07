describe.skip('[Authenticate]', () => {
    it('Authenticate user with valid token', () => {
        //Asserts token is valid
        //Asserts req.isAuth is true
    });

    it('Authenticate user with invalid token', () => {
        //Asserts token is invalid
        //Asserts req.isAuth is false
    });

    it('Blocks user when authentication header is missing ', () => {
        //Asserts authentication header is missing
        //Asserts req.isAuth is false
    });
});
