const {MongoClient} = require("mongodb");
const {ObjectId} = require('mongodb');

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

    try {

        const db = await connectToDatabase();
        await db.collection('items').deleteOne({"_id": ObjectId(event['id'])});

        return {}

    } catch (e) {
        console.log({e})

        return {
            error: "Error",
            reason: JSON.stringify(e)
        }
    }
};
