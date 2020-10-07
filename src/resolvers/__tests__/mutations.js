const resolvers = require('../');
const { models } = require('../../../mocks');

describe('[Mutations.addFavorite]', () => {
    const mockContext = {
        models: {
            Listing: models.Listing
        }
    };
    mockContext.models.Listing.findOneAndUpdate = jest.fn();
    const {findOneAndUpdate} = mockContext.models.Listing;

    it('Mutates listing and updates favoriteCount by 1, returns listing Id and favorite count', async () => {
        const listingId = "2";
        const count = 2;
        findOneAndUpdate.mockReturnValueOnce({listingId, favoriteCount: count});
        const res = await resolvers.Mutation.addFavorite(
            null,
            { input: { listingId } },
            mockContext,
        );
        expect(res).toEqual({
            favoriteCount: count,
            listingId
        });
        expect(findOneAndUpdate).toBeCalledWith(    {listingId},
            { $inc: { favoriteCount: 1 }},
            {new: true});
    });

    it('Mutates listing with non existent id: returns empty', async () => {
        const listingId = "2";
        findOneAndUpdate.mockReturnValueOnce(null);
        const res = await resolvers.Mutation.addFavorite(
            null,
            { input: { listingId } },
            mockContext,
        );
        expect(res).toEqual([]);
        expect(findOneAndUpdate).toBeCalledWith(    {listingId},
            { $inc: { favoriteCount: 1 }},
            {new: true});
    });
});