const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Cart {
    constructor(product_name, price, quantity,img_path,id ) {
        this._id = id;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
        this.img_path = img_path;
    }

    save_cart() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('cart')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('cart').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('cart')
            .find()
            .toArray()
            .then(cart => {
                // console.log(cart);
                return cart;
            })
            .catch(err => {
                console.log(err);
            });
    }
   

    static deleteByIds(prodId) {
        const db = getDb();
        return db
            .collection('cart')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
    


}

module.exports = Cart;