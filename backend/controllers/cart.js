const Mongo = require('../lib/database');

module.exports.getCartProducts = async (_, res) => {
    try {
        const result = await (await Mongo()).db.collection('cart').find({}).toArray();
        res.status(200).send({ status: 'success', message: result });
    } catch (err) {
        console.log(err);
        res.status(400).send({ status: "failure", message: "Unable to fetch cart products" });
    }
}

module.exports.addToCart = async (req, res) => {
    if (req.body && req.body.product) {
        try {
            const cartResult = await (await Mongo()).db.collection('cart').insertOne(req.body.product);
            if (!cartResult) return res.status(400).send({ status: 'failure', message: 'Error while adding product to cart' });
            res.status(200).send({ status: 'success', message: cartResult });
        } catch (err) {
            console.log(err);
            res.status(400).send({ status: "failure", message: "Unable to add product to cart" });
        }
    } else res.status(400).send({ status: "failure", message: "Missing product" });
}

module.exports.removeFromCart = async (req, res) => {
    if (req.body && req.body.product) {
        try {
            const cartResult = await (await Mongo()).db.collection('cart').deleteOne({ _id: req.body.product._id.toString() });
            if (!cartResult) return res.status(400).send({ status: 'failure', message: 'Error while removing product from cart' });
            res.status(200).send({ status: 'success', message: cartResult });
        } catch (err) {
            console.log(err);
            res.status(400).send({ status: "failure", message: "Unable to remove product from cart" });
        }
    } else res.status(400).send({ status: "failure", message: "Missing product" });
}