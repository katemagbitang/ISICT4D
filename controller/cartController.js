const db = require('../model/db.js');
const productModel = require('../model/productModel.js');
const cartModel = require('../model/cartModel.js');
const sellerModel = require('../model/sellerModel.js');
const ObjectId = require('mongodb').ObjectID;

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
                        
                            // var sName = [];

                            // // seller.forEach(function(a,err){
                            //     sellerModel.findOne({_id: seller},  function (err, sellerresult) {
                            //         var name = sellerresult.seller;
                            //         sName.push(name);
                            //     });
                            // // })

                            var cartitem = {
                                productID: productID,
                                productName: productName,
                                productCategory: productCategory,
                                productOrigin: productOrigin,
                                productDescription: productDescription,
                                quantity: quantity,
                                // price: price.toFixed(2),
                                price: price,
                                seller: seller,
                                photo: photo,
                                // subtotal: subtotal.toFixed(2),
                                subtotal: subtotal
                            }

                            cartItemsList.push(cartitem);
                        
                            cartItemsCount++;
                            if(cartItemsCount == simpleitems.length){

                            // console.log("cartItemsList: "+ JSON.stringify(cartItemsList, null, ' '));
                                res.render("cart",{
                                    cartItemsList: cartItemsList,
                                    // grandtotal: grandtotal.toFixed(2),
                                    grandtotal: grandtotal
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
    },
    postAddToCart: function(req, res){
        var username = req.session.username;
        var productID = req.params.productID;
        var quantity = req.body.quantity;

        if(quantity == null) {
            quantity = 1; //default quantity is 1, for the add to cart from browse and search results
        }
        console.log("Book to be Added: " + productID);
        console.log("Quantity: " + quantity);
        
        cartModel.findOne({username: username}, function(err, cartResult){
            // console.log("\n\ncartResult: " + cartResult);
            //If there is an existing Active cart si username
            if(cartResult != null){
                //push the the bookVersion and wuiantity to the item array of the cartItem

                var item = {
                    productID: ObjectId(productID),
                    quantity: parseInt(quantity)
                }

                //if may laman si active cart, push the item along with existing list of items
                if(cartResult.items.length !=0){
                    count = 0;
                    alreadyinside = false;
                    cartResult.items.forEach(function(v, err){

                        //checks if meron nang same item in the cart, if true increment the qunatity nalang
                        if(v.productID == productID){
                            v.quantity += parseInt(quantity);
                            alreadyinside = true;
                        }

                        count++;
                        if(count == cartResult.items.length ){
                            if(alreadyinside == false){
                                //if the item is not in the cart yet, push new item
                                cartResult.items.push(item);
                            }

                            console.log(cartResult.items);
                            cartItemsModel.updateOne({username: username}, {$set: {items: cartResult.items}}, function(){
                                res.redirect("/cart");
                            });
                        }
                    });
                }
                //if walang laman si active cart, just push the item
                else{
                    cartResult.items.push(item);
                    cartModel.updateOne({username: username}, {$set: {items: cartResult.items}}, function(){
                        res.redirect("/cart");
                    });

                }


            }
            //else if Walang active cart si user
            else{

                // create a new cart with isActive = true then add the necessary deets

                var cart = new cartModel({
                    cartItemsID : new ObjectId(),
                    username:  username,
                    items : [
                        {
                            productID: ObjectId(productID),
                            quantity:  parseInt(quantity)
                        }
                    ]
                });

                cart.save();

                res.redirect("/cart");
                
            }
        });
    },

    // this sends the number of individual items in the cart  ((quantity doesnt matter))
    getCartItemsCount: function(req, res){

        var username = req.session.username;

        cartModel.findOne({username: username}, function(err, cartItemsResult){
            if(cartItemsResult){
                var CartItemsCount = cartItemsResult.items.length;
                res.send(CartItemsCount.toString());
            }else{
                res.send("0");
            }
        });
    },
    //update the database about the removed books
    postRemoveBook: function(req, res) {
        console.log("Removing product from cart");

        var username = req.session.username;
        var productID = req.params.productID;
        console.log("product to be removed: " + productID);
        var productList = [];

        cartModel.findOne({username: username}, function(err, cartItemsResult) {
            if (cartItemsResult != null) {
                var cartlist = cartItemsResult.items;
                console.log("Cart List: " + cartlist);

                cartlist.forEach(function(item, err) {
                    if (item.productID == productID) {
                        console.log("Found");
                    }
                    else {

                        productList.push(item);
                        console.log("Book List: " + item);
                    }
                });
            }
            console.log("Product List Items: " + productList);

            cartModel.updateOne({username: username,}, {$set: {items: productList}}, function() {
                res.redirect("/cart");
            });
        });
    }
}
module.exports = cartController;                                          