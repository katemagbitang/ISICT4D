const db = require('../model/db.js');
const sellerModel = require('../model/sellerModel.js');
const productModel = require('../model/productModel.js');

const multer = require('multer');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;


//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/img',
    filename: function( req, file, callback){
        callback(null, filename =  file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    }
});

//init upload 
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    }
}).single('myImage');

// check file type
function checkFileType(file , callback){
    // allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return callback(null, true);
    }else{
        callback("Error: Images only");
    }
}

const adminController = {
    getAddProduct: function(req,res){
        if (req.session.userType == "Admin") {
            res.render("addproducts",{});
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },
    postAddProduct: function(req,res){
        var productID = ObjectId();
        var productName = req.body.Product_Title;
        var productCategory = req.body.category;
        var productOrigin = req.body.origin;
        var productDescription = req.body.description;
        var quantity = req.body.quantity;
        var price = req.body.price;
        var seller = req.body.seller;

        var photo = req.file.filename;


        var sellerName = seller.trim(); // makes sure there's no space at the start and end (useful in string comparison)
        sellerModel.findOne({seller:sellerName}, function(err,sellerResult){
            if(!sellerResult){
                // if author DOES NOT exist in the db, make an author object then push its _ID

                var seller = new sellerModel({
                    // sellerID : new ObjectId(),
                    seller : sellerName
                })

                seller.save();
            }

            var item = {
                productID:  productID,
                productName : productName,
                productCategory :  productCategory, 
                productOrigin : productOrigin,
                productDescription : productDescription,
                quantity : quantity,
                price : price,
                seller: seller,
                photo : '../img/'+photo // i added ../img/
            }

            db.insertOne(productModel, item);
            res.redirect('/shop');
        });


    }
}
module.exports = adminController;