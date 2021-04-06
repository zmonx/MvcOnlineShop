const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');

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
exports.insert = (req, res, next) => {
    res.render('products/insert', {
        pageTitle: '',
    });
}
// exports.details = (req, res, next) => {
//     res.render('products/detail', {
//         pageTitle: '',
//     });
// }
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
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let description = '';
    let img_path = '';
    let category_name = '';

    Product.findById(product_id)
        .then(product => {
            // console.log(product);
            product_name = product.product_name;
            price = product.price;
            description = product.description;
            img_path = product.img_path;
            category_name = product.category_name;

            res.render('products/detail', {
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                // amount:amount,
                category_name:category_name,
                img_path:img_path,
                description:description
                
            });
            console.log(category_name);
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
        product_name: product_name,
        price: price,
        amount:amount,
        category_name:category_name,
        img_path:img_path,
        description:description
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { product_name,price,amount,img_path,category_name,description} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            price: price,
            amount:amount,
            category_name:category_name,
            img_path:img_path,
            description:description

        });
    }

    const product = new Product(product_name,price,amount,img_path,category_name,description);
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

// exports.getUpdateProduct = (req, res, next) => {
//     console.log(req.params);
//     const { product_id } = req.params;
//     let product_name = '';
//     let price = '';

//     Product.findById(product_id)
//         .then(product => {
//             console.log(product);
//             product_name = product.product_name;
//             price = product.price;
//             res.render('products/update', {
//                 pageTitle: 'Update Product',
//                 errorMessage: null,
//                 product_id: product_id,
//                 product_name: product_name,
//                 price: price
//             });
//         })
//         .catch(err => console.log(err));
// };

// exports.postUpdateProduct = (req, res, next) => {
//     console.log(req.body);
//     const { product_id, product_name, price } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.render('products/update', {
//             pageTitle: 'Update Product',
//             errorMessage: errors.array(),
//             product_id: product_id,
//             product_name: product_name,
//             price: price
//         });
//     }

//     const product = new Product(product_name, price, new ObjectId(product_id));
//     product
//         .save()
//         .then(result => {
//             console.log('Update Product');
//             res.redirect('/products');
//         })
//         .catch(err => console.log(err));
// };

// exports.getDeleteProduct = (req, res, next) => {
//     const { product_id } = req.params;
//     console.log(product_id);
//     Product.deleteById(product_id)
//         .then(() => {
//             console.log('Delete Product');
//             res.redirect('/products');
//         })
//         .catch(err => console.log(err));
// };