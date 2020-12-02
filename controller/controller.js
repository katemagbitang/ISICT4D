const controller = {
    
    getIndex: function(req,res){
        res.render('index',{});
    },
    getHome: function(req,res){
        res.render('home',{});
    },
    //gets current session's userType. useful for validating user permissions
    getSession: function(req, res){
        
        if(req.session.userType != null) // logged in, either Regular or Admin
            res.json({userType:req.session.userType});
        else // if noone is logged in
            res.json({userType:"Visitor"});
    },
    getAbout: function(req,res){
        res.render('aboutus',{});
    }
}

module.exports = controller;