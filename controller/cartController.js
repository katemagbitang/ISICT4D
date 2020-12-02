const db = require('../model/db.js');
const productModel = require('../model/productModel.js');
const cartModel = require('../model/cartModel.js');
const sellerModel = require('../model/sellerModel.js');

const cartController = {
    getCart: function(req,res){
        if (req.session.userType != "Admin") {
            var username = req.session.username;

            /*
                ##  quantity
                ##  bookCover, price, quality, edition, type
                ##  title
                ##  Subtotal and GrandTotal

                from carITemsModel: items: [bookVersion, quantity]                              
                from versionsresult:  bookCover, sellingPrice,quality, edition, type bookVersion_ID **book_ID         
                from booksresult: title, author(contains _id of authors)                        
                from authorsresult: aName
            */
            var simpleitems = []; // stores the items from the cartItemsResult
            var cartItemsList = []; // stores all data needed for hbs
        
            cartModel.findOne({username:username}, function(err, cartItemsResult){
                if(cartItemsResult != null){
                    var cartItemsCount = 0;
                    simpleitems = cartItemsResult.items;
                    // console.log("cartItemsResult: " + simpleitems);
                    var bookVersionTry = [];
                    var grandtotal = 0; 
                    
                    if (simpleitems.length === 0) {
                        res.render("cart",{});
                    } 
                    else {
                        simpleitems.forEach(function(v, err){

                            var productID = v.productID;
                            var productName = v.productName;
                            var productCategory = v.productCategory;
                            var productOrigin = v.productOrigin;
                            var productDescription = v.description;
                            var quantity = v.quantity;
                            var price = v.price;
                            var seller = v.seller;
                            var photo = v.photo; 
                            var subtotal = quantity*price;
                            grandtotal += subtotal;
                        
                            var sName = [];

                            seller.forEach(function(a,err){
                                sellerModel.findOne({_id: seller},  function (err, sellerresult) {
                                    var name = sellerresult.seller;
                                    sName.push(name);
                                });
                            })

                            var cartitem = {
                                productID: productID,
                                productName: productName,
                                productCategory: productCategory,
                                productOrigin: productOrigin,
                                productDescription: productDescription,
                                quantity: quantity,
                                price: price.toFixed(2),
                                seller: sName,
                                photo: photo,
                                subtotal: subtotal.toFixed(2)
                            }

                            cartItemsList.push(cartitem);
                        
                            cartItemsCount++;
                            if(cartItemsCount == simpleitems.length){

                            // console.log("cartItemsList: "+ JSON.stringify(cartItemsList, null, ' '));
                                res.render("cart",{
                                    cartItemsList: cartItemsList,
                                    grandtotal: grandtotal.toFixed(2)
                                });
                            }
                        });
                    }
                }
                else{
                    res.render("cart",{});
                }  
            });
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    }
}
module.exports = cartController;

                        // var quantity = simpleitem.quantity;

                        // console.log("simpleitem.bookVersion :  " + simpleitem.bookVersion);
                        // productModel.findOne({bookVersion_ID: simpleitem.bookVersion}, function (err, versionsresult) {
                        //     if (versionsresult != null) {
                        //         var bookVersion_ID = versionsresult.bookVersion_ID;
                        //         var book_ID = versionsresult.book_ID;
                        //         var bookCover = versionsresult.bookCover;
                        //         var sellingPrice = versionsresult.sellingPrice;
                        //         var type = versionsresult.type;
                        //         var quality = versionsresult.quality;
                        //         var edition = versionsresult.edition;
                        //         var subtotal = quantity*sellingPrice;
                        //         grandtotal += subtotal;
                
                        //         booksModel.findOne({book_ID: book_ID}, function (err, booksresult) {
                        //             if (booksresult != null) {
                        //                 var authorsID = booksresult.author;
                        //                 var title = booksresult.title;
                        //                 var publisher = booksresult.publisher;
                        //                 var year = booksresult.year;
                        //                 var category = booksresult.category;
                        //                 var bookSynopsis = booksresult.bookSynopsis;
                
                        //                 authorModel.find({_id:authorsID}, function (err, authorsresult) {
                        //                     if (authorsresult != null) {
                        //                         var aName = []; //because there can be multiple authors
                        //                         authorsresult.forEach(function(authors, err){
                        //                             aName.push(authors.aName);
                        //                         });
                        //                     }


                                            