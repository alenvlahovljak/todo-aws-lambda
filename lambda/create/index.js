const AWS = require('aws-sdk');
const MongoClient = require("mongodb").MongoClient;

AWS.config.region = process.env.REGION;

let cachedDb = null;
const lambda = new AWS.Lambda();

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
        const r = await db.collection('items').insertMany([{name: event['name']}])

        const params = {
            FunctionName: 'readTodos',
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
        };

        return await lambda.invoke(params, function (err, data) {
            if (err) {
                context.fail(err);
            } else {
                context.succeed(JSON.parse(data.Payload));
            }
        }).promise()
    } catch (e) {
        console.log({e})

        return {
            error: "Error",
            reason: JSON.stringify(e)
        }
    }
};
