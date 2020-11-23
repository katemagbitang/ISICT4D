const db = require('../model/db.js');
const adminController = {
    getAddProduct: function(req,res){
        if (req.session.userType == "Admin") {
            res.render("addproducts",{});
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    }
}
module.exports = adminController;