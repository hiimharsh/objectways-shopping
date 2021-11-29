const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connect () { 
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    return { db, client };
}

module.exports = connect;