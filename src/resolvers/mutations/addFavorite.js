/**
 * addFavorite
 * Increment listing favorite counter by 1 and return id and updated counter
 */
const addFavorite = async (parent, { input }, { models }) => {
    const { listingId } = input;
    const addFavoriteUpdate = await models.Listing.findOneAndUpdate(
        {listingId: listingId},
        { $inc: { favoriteCount: 1 }},
        {new: true}
    )
    if(!addFavoriteUpdate){
        /**
         * For now, just returning an empty response.
         * In a real application, we need to return a custom
         * response so the client is aware  of the message.
         * EG: {data:[], message:'listing id: <id> does not exist', code:'LISTING_ID_NOT_FOUND'}
         * **/
        return []
    }
    return addFavoriteUpdate
};

module.exports =  addFavorite