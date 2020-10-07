# takehome-pandemic-edition  
  

## Read First:

**To whom may be reading**: I spent ~2 nights equating ~6-7 hours working on this, ergo, I have simplified many implementations that I will explain, not to worry.  Although the task assignments are relatively simple they are by no means trivial in terms of design decisions, assumptions and implementations when scaling an application.  I will then attempt to explain my oversimplifications and corner cuttings and explain how it should be done in a production environment when applicable.  
 
### Quick Start (Using the service)

 1. After cloning, ***npm install*** at the root folder
 2. Once done you can start the service by running ***npm start***
 3. Since the ***/api*** endpoint is protected you need to use postman or an equivalent HTTP client.
 4. To get all listings use the following **Query** using the following endpoint with the payload using the auth token. If you're using postman, click Authorization and select Bearer Token and enter what you see below:
	 
	Bearer Token 676cfd34-e706-4cce-87ca-97f947c43bd4
    
    POST http://localhost:4000/api
    
    *payload:*
    
        query {
        properties {
          listingId
          favoriteCount
          property {
            area
            bedrooms
          }
          address{
            city
            streetName
          }
         }
        }
*You can use any field from the simply rets properties response as I have added all the field names to the property type.*

 #### Filtering by city
 Add a city input to the properties to filter by city. empty string will return all.
 
        query {
        properties(city: "houston") {
          listingId
          favoriteCount
          property {
            area
            bedrooms
          }
          address{
            city
            streetName
          }
         }
        }

#### Updating favorite counter
Use the following query to increment a single property listing's favorite counter by 1. It will return only the new favoriteCount number and the listing Id

    mutation{
      addFavorite(input:{listingId:"49699701"}){
        favoriteCount
        listingId
      }
    }

 #### Running Tests
 Run `npm test` to run unit tests. Please read the testing section below as due to time constraints I have implemented unit tests only for resolvers & stubbed out the remaining tests.
 
###  Overview
##### Dependencies
No surprise that i'm leveraging apollo-server-express + express using v2 of apollo server.  I've added mongoose as the mongodb driver wrapper since it's an industry standard as well as plenty of personal experience. And the only other application dependency is apollo-datasource-rest which handles basic fetching use cases for the simplyrets call and plays nicely with apollo-datasource (no need to handle fetch service errors unless you want to manually control them).

##### Architecture
The file structure should be self explanatory. Since graphql uses a single endpoint and since this mini service is only using a single Schema (properties), there's only a need for one Schema definition, **Properties**. All fields for the property listings types exist in properties.js along with the Mutation type and Mutation input type to modify the favorite count for a property listing.

Because there's only a single schema (properties), you can get away with a single resolver which handles the fetching of the simply rets external api, then querying the DB listing data which includes the favoriteCount for each listing, and the merging and returning of the requested data. ***Please read*** my detailed notes inside the ***src/resolvers/queries/properties.js*** file that details a few assumptions and comments on the code.

#### DB
Two schemas. user & listings. Listings holds the favorite counter with a listingId & favorite counter. Check out src/models to get an idea. Normally I would index the listingId or transform the native _id on Listing model. But for this exercise I'm just querying by listingId. 

##### Authentication
Apologies in advance but I was slightly confused when I read the doc about authentication so I made a couple assumptions. The assignment said to use Basic HTTP Auth but suggested to insert User documents with a prebaked token which isn't Basic but Bearer. Because of time constraints, I decided to go against sanctioned security practices and just query the DB for the provided token and if it exists, grant auth. Obviously, in a real world application if you're implementing JWT  you need to sign a login/signup jwt payload with a secret and use a library like bcrypt to match the provided password. If you're using actual Basic Auth, you need to generate a salt and encrypt your password and store the hash (It's actually a little more complicated than that).

Anyways, I can go into more security detail if need, but I just slapped the auth middleware on express and passed isAuth onto the req object to be checked in context on every query. This works just fine. Checkout *authenticate.js* inside ***/middleware***

##### Testing
Because of time, I have implemented unit test coverage for resolvers only (queries & mutations). Please see under ***src/resolvers/__tests__***

For the other areas of testing, integration tests inside ***src/server/__tests__***, authentication middleware tests, and data-source tests, ***I have simply stubbed out*** describe and it actions detailing what I would test and which assertions I would express.