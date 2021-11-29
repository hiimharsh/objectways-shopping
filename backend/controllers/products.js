const Mongo = require('../lib/database');

module.exports.getProducts = async (_, res) => {
    try {
        const result = await (await Mongo()).db.collection('products').find({}).toArray();
        res.status(200).send({ status: 'success', message: result });
    } catch (err) {
        console.log(err);
        res.status(400).send({ status: "failure", message: "Unable to fetch products" });
    }
}