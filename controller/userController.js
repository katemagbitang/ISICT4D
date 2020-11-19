const db = require('../model/db.js');

const userModel = require('../model/userModel.js');

const userController = {
    getSignup: function(req,res){
        res.render('signup',{});
    },
    postSignup: function(req,res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var fName = req.body.fname;
        var lName = req.body.lname;
        var userType = 'Regular';

        console.log("ENTER");
        // bcrypt.hash(password, saltRounds, function(err, hash) {

            let user = userModel.findOne({ email: email });
            if (!user) {
                // return res.render('error')
                return res.status(400).send('That user already exists!');
            }

            user = new userModel({
                username: username,
                email: email,
                password: password,
                firstName:fName,
                lastName: lName,
                userType: userType

            });
            user.save();
            console.log(user);

            res.redirect('/login');
        
        // })
    },
    getLogin: function(req,res){
        res.render("login",{});
    },
    postLogin: function(req,res){
        var username = req.body.username;
        var password = req.body.password;

        db.findOne(userModel, {username : username}, '', function(result){
            if(result != null) { // if username EXISTS in the db
                if (username == result.username){
                    // bcrypt.compare(password, result.password, function(err, equal) {
                        // if(equal){ // correct password

                            var userUpdate = {
                                _id: result._id,
                                username: result.username,
                                email: result.email,
                                password: result.password,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                userType: result.userType,
                                // lastLogin: Date.now()
                            }

                            // db.updateOne(userModel, {username : username}, userUpdate);

                            req.session.username = result.username;
                            req.session.userType = result.userType;
                            res.redirect("/"); //success, then redirects to home
                        // }
                        // else { // wrong password
                        //     res.render("login", {err:"Username and password does not match."});
                        // }
                    // })
                }
            }else{//if username DOES NOT EXIST in the db
                res.render("login", {err:"Username and password does not match."});
            }
        });
    }
}

module.exports = userController;