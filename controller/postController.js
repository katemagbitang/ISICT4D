const Post = require('../model/postModel.js');
const Count = require('../model/countModel.js');

const postController ={
    
    getCreatePost : function(req,res){
        if (req.session.userType == "Admin") {
            res.render("createpost",{});
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },
    postCreatePost : function(req,res){
        // Count.findOneAndUpdate({identity: "counter"},{$inc: {numberPost: 1}},function(err,number){
            let post = new Post({
                // postNumber: number.numberPost+1,
                postNumber: 1,
                username: req.session.username,
                title: req.body.dtitle,
                postText: req.body.darticle,
                postDate: Date.now(),
                commentNumber: 0,
                reacts: 0,
            });
            post.save();
            console.log('Post Added');
            res.redirect('/articles');
        // })
    },
    viewAllPost : function(req,res){
        Post.find({}, function(err, posts){
            if(err){
                console.log(err);
            } else{
                if(req.user){
                    res.render('articles',{
                        posts: posts,
                        UserLogged: true
                    })
                }
                else{
                    res.render('articles',{
                        posts: posts,
                        UserLogged: false
                    })
                }
                
            }
        });
    }
}
module.exports = postController;