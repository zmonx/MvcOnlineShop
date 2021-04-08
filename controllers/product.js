const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const Cart = require('../models/cart');


const ObjectId = mongodb.ObjectId;



// exports.index = (req, res, next) => {
//     res.render('index', {
//         pageTitle: '',
//     });
// }

exports.shopPage = (req, res, next) => {
    res.render('products/shop', {
        pageTitle: '',
    });
}




exports.updatePage = (req, res, next) => {
    res.render('products/update', {
        pageTitle: '',
    });
}
exports.insert = (req, res, next) => {
    res.render('products/insert', {
        pageTitle: '',
    });
}
// exports.update = (req, res, next) => {
//     res.render('products/update', {
//         pageTitle: '',
//     });
// }
exports.getSearchProduct_edit = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/product', {
                pageTitle: 'Search phone',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.cartPage = (req, res, next) => {

    Cart.fetchAll()
        .then(cart => {
            res.render('products/cart', {
                pageTitle: 'Cart',
                prods: cart,
            });
        })
        .catch(err => {
            console.log(err);
        });
}




exports.getSearchProduct_homepage = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('index', {
                pageTitle: 'Search phone',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProductByPhone = (req, res, next) => {

    Product.fetchAllByPhone()
        .then(products => {
            res.render('products/phone', {
                pageTitle: 'Search phone',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getSearchProductByLaptop = (req, res, next) => {

    Product.fetchAllByLaptop()
        .then(products => {
            res.render('products/laptop', {
                pageTitle: 'Search laptop',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getSearchProductByComputer = (req, res, next) => {

    Product.fetchAllByComputer()
        .then(products => {
            res.render('products/computer', {
                pageTitle: 'Search computer',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/shop', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
// exports.getSearchProduct = (req, res, next) => {

//     Product.fetchAll()
//         .then(products => {
//             res.render('products/shop', {
//                 pageTitle: 'Search Product',
//                 prods: products,
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

exports.detailProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);    
    // let product_name = '';
    // let price = '';
    // let description = '';
    // let img_path = '';
    // let category_name = '';

    Product.findById(product_id)
        .then(product => {
            // console.log(product);
            product_name = product.product_name;
            price = product.price;
            description = product.description;
            img_path = product.img_path;
            category_name = product.category_name;
            console.log(category_name);

            res.render('products/detail', {
                errorMessage: null,
                // product_id: product_id,
                product_name: product_name,
                price: price,
                category_name: category_name,
                img_path: img_path,
                description: description

            });
        })
        .catch(err => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const price = '';
    const amount = '';
    const category_name = '';
    const img_path = '';
    const description = '';
    res.render('insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        // product_id: product_id,
        category_name: category_name,
        product_name: product_name,
        price: price,
        amount: amount,
        description: description,
        img_path: img_path
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { category_name, product_name, price, amount ,  description , img_path } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            category_name: category_name,
            product_name: product_name,
            price: price,
            amount: amount,
            description: description,
            img_path: img_path

        });
    }

    const product = new Product(category_name, product_name,price, amount , description , img_path);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/shop');
        })
        .catch(err => {
            console.log(err);
        });

};






exports.getAddtoCart = (req, res, next) => {
    const product_name = '';
    const price = '';
    const quantity = '';
    const img_path = '';
    res.render('products/shop', {
        pageTitle: 'Insert cart',
        errorMessage: null,
        product_name: product_name,
        price: price,
        quantity: quantity,
        img_path: img_path,
    });
};

exports.postAddtoCart = (req, res, next) => {
    console.log(req.body);
    const { product_name, price, quantity, img_path} = req.body;

    const cart = new Cart(product_name, price, quantity, img_path);
    cart
        .save_cart()
        .then(result => {
            // console.log(result);
            console.log('Created cart');
            res.redirect('/shop');
        })
        .catch(err => {
            console.log(err);
        });

};


exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            category_name = product.category_name;
            product_name = product.product_name;
            price = product.price;
            amount = product.amount;
            description = product.description;
            img_path = product.img_path;
            res.render('products/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                category_name: category_name,
                product_name: product_name,
                price: price,
                amount: amount,
                description: description,
                img_path: img_path
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, category_name, product_name,  price , amount,  description , img_path } = req.body;


    const product = new Product(category_name, product_name,  price , amount ,  description , img_path, new ObjectId(product_id));
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/product');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/product');
        })
        .catch(err => console.log(err));
};

exports.getDeleteCart = (req, res, next) => {
    const { cart_id } = req.params;
    console.log(cart_id);
    Cart.deleteByIds(cart_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};