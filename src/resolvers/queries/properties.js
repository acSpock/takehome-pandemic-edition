/**
 * I'm making the assumption that data in this api is transient
 * and therefore new data may arrive tomorrow and old listings may disappear.
 * If this is true, then we have to manage adding and deleting of new and old data respectively.
 *
 * But I wont worry about managing deleting old data, only adding new data here for time sake.
 *
 * Flow this resolver:
 *  1. fetch api
 *  2. fetch db listing
 *  3. map db listing and merge array to get O(m+n)
 *  4. **batch add any listing not in db
 *  5. return data
 *
 *  ** In a real scenario, I would modularize the batch job outside of this resolver, pre-populate the DB
 *     somewhere else or cache the listings for quicker access
 *
 *   I also could have just boot loaded this data on application startup and be done with it,
 *   however, because my assumption is that the api data is transient, I want to handle such cases while the application is running.
 * **/

module.exports = async (parent, { city }, { dataSources, models }) => {
    const { SimplyRETSClient } = dataSources;
    const batchListingArr = [];

    /** Fetch simplyRETS api properties **/
    let apiListings = await SimplyRETSClient.getProperties();

    /**
     * Pull favorite listings from DB and Map them
     * (There's a map mongoose function but it wasn't behaving correctly to which I attempted
     * to fix it but in sake of saving time I mapped outside the call)
     * **/
    const dbListings = await models.Listing.find({});
    const dbListingsMap = Object.fromEntries(
        dbListings.map(l => [l.listingId, {favoriteCount: l.favoriteCount}])
    );

    /** Return listings filtered by city if query exists **/
    if(city){
        apiListings = apiListings.filter( listing => {
            return listing.address.city.toLowerCase().trim() === city.toLowerCase().trim();
        });
    }

    /** Insert favorite count if exists in DB, otherwise add to DB **/
    apiListings.forEach(listing => {
        const { listingId } = listing;
        if(dbListingsMap[listingId]){
            listing.favoriteCount = dbListingsMap[listingId].favoriteCount;
        } else {
            let newListing = new models.Listing()
            newListing.listingId = listingId;
            newListing.favoriteCount = 0;
            batchListingArr.push(newListing);
            //Defaults favorite count to 0 if it's the first time
            listing.favoriteCount = 0;
        }
    });

    /**
     * Batch update db listings / Ideally would be in a separate module, managed separately
     * I would never put this code here in a real application. Due to time constraints.
     * **/
    if(batchListingArr.length > 0) await models.Listing.insertMany(batchListingArr);

    return apiListings;
}