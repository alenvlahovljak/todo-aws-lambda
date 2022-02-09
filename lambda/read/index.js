const {MongoClient} = require("mongodb");

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = await client.db(process.env.DB_NAME);

    cachedDb = db;

    return db;
}

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const query = event.queryStringParameters || {};

    let limit = 10;
    let offset = 0;

    if(query['limit']){
        limit = Number(query['limit']);
    }

    if(query['offset']){
        offset = Number(query['offset']);
    }

    try {
        const db = await connectToDatabase();
        const results = await db.collection("items").find({}).limit(limit).skip(offset).toArray();

        return {
            "statusCode": 200,
            "body": JSON.stringify({
                count: results.length,
                results: results
            }),
        }

    } catch (e) {
        return {
            error: "Error",
            reason: JSON.stringify(e)
        }
    }
};
