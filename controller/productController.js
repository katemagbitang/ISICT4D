const db = require('../model/db.js');
const productModel = require('../model/productModel.js');
const sellerModel = require('../model/sellerModel.js');

const productController = {
    getShop: function (req,res){
        var productList = [];

        productModel.find({},function(err,productResult){
            if (productResult != null){
                productCount = 0;

                productResult.forEach(function(v, err){
                    var productID = v.productID;
                    var productName = v.productName;
                    // var productCategory = v.productCategory;
                    var productOrigin = v.productOrigin;
                    // var productDescription = v.description;
                    var quantity = v.quantity;
                    var price = v.price;
                    var seller = v.seller;
                    var photo = v.photo; 
                    
                    var sName = [];

                    seller.forEach(function(a,err){
                        sellerModel.findOne({_id: seller},  function (err, sellerresult) {
                            var name = sellerresult.seller;
                            sName.push(name);
                        });
                    })
                    
                    var productListing = {
                        productID: productID,
                        productName: productName,
                        // productCategory: productCategory,
                        productOrigin: productOrigin,
                        // productDescription: productDescription,
                        quantity: quantity,
                        price: price,
                        seller: sName,
                        photo: photo
                    }

                    productList.push(productListing);

                    productCount++;
                        if(productCount == productResult.length){
                            //renders the page
                            res.render("shop",{
                                header: "All Products",
                                productList: productList,
                                userType: req.session.userType
                            });
                        }
                })
            }
        })

        
    },
    getOneProduct: function(req,res) {
        var productID = req.params.productID;

        productModel.find({productID: productID},function(err,productResult){
            if (productResult != null){
                var productID = productResult.productID;
                var productName = productResult.productName;
                var productCategory = productResult.productCategory;
                var productOrigin = productResult.productOrigin;
                var productDescription = productResult.description;
                var quantity = productResult.quantity;
                var price = productResult.price;
                var seller = productResult.seller; 
                var photo = productResult.photo;
                
                sellerModel.findOne({_id: seller},  function (err, sellerresult) {
                    if (sellerresult != null){
                        var sName = [];
                        var name = sellerresult.seller;
                        seller.forEach(function(a,err){
                            sName.push(name);
                        })

                        // res.render("shopProduct",{
                        //     productID: productID,
                        //     productName: productName,
                        //     productCategory: productCategory,
                        //     productOrigin: productOrigin,
                        //     productDescription: productDescription,
                        //     quantity: quantity,
                        //     price: price,
                        //     seller: sName,
                        //     photo: photo,
                        //     userType: req.session.userType
                        // });
                    }                           
                });

                res.render("shopProduct",{
                    productID: productID,
                    productName: productName,
                    productCategory: productCategory,
                    productOrigin: productOrigin,
                    productDescription: productDescription,
                    quantity: quantity,
                    price: price,
                    seller: seller,
                    photo: photo,
                    userType: req.session.userType
                });
            }
        })
    }
}

module.exports = productController;