const resolvers = require('../');
const { models } = require('../../../mocks');

describe('[Queries.Properties]', () => {
    const mockContext = {
        dataSources: {
            SimplyRETSClient: {getProperties: jest.fn()},
        },
        models: {
            Listing: models.Listing
        }
    };
    mockContext.models.Listing.find = jest.fn();
    mockContext.models.Listing.insertMany = jest.fn();

    const {getProperties} = mockContext.dataSources.SimplyRETSClient;
    const {find} = mockContext.models.Listing;

    it('Merges favorite counter into api list when data exists in DB', async () => {
        getProperties.mockReturnValueOnce([{listingId: "1"}]);
        find.mockReturnValue([{listingId: "1", favoriteCount: 1}]);
        const res = await resolvers.Query.properties(null, {}, mockContext);
        expect(res).toEqual([{
            listingId: "1",
            favoriteCount: 1
        }]);
    });

    it('Defaults favorite counter to 0 when data does not exist in DB', async () => {
        getProperties.mockReturnValueOnce([{listingId: "1"}]);
        find.mockReturnValue([]);
        const res = await resolvers.Query.properties(null, {}, mockContext);
        expect(res).toEqual([{
            listingId: "1",
            favoriteCount: 0
        }]);
    });

    it('Sets favorite counter for all returned responses from DB', async () => {
        getProperties.mockReturnValueOnce([
            {listingId: "1", terms: "Conventional"},
            {listingId: "2", terms: "Conventional"}
        ]);
        find.mockReturnValue([
            {listingId: "1", favoriteCount: 12},
            {listingId: "2", favoriteCount: 5}
        ]);
        const res = await resolvers.Query.properties(null, {}, mockContext);
        expect(res).toEqual([
            {listingId: "1", terms: "Conventional", favoriteCount: 12},
            {listingId: "2", terms: "Conventional", favoriteCount: 5}
        ]);
    });

    it('Expects correct city to be returned', async () => {
        getProperties.mockReturnValueOnce([
            {listingId: "1", address: {city: "houston"}},
            {listingId: "2", address: {city: "katy"}}
        ]);
        find.mockReturnValue([]);
        const res = await resolvers.Query.properties(null, {city: 'houston'}, mockContext);
        expect(res).toEqual([
            {listingId: "1", address: {city: "houston"}, favoriteCount: 0},
        ]);
    });

    it('Expects empty response when city does not exist', async () => {
        getProperties.mockReturnValueOnce([
            {listingId: "1", address: {city: "houston"}},
            {listingId: "2", address: {city: "katy"}}
        ]);
        find.mockReturnValue([]);
        const res = await resolvers.Query.properties(null, {city: 'fakecitydotcom'}, mockContext);
        expect(res).toEqual([]);
    });
});