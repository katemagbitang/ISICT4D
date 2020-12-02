const Post = require('../model/postModel.js');
const Count = require('../model/countModel.js');
const { ObjectID } = require('mongodb');

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
                postNumber: new ObjectID(),
                username: req.session.username,
                title: req.body.dtitle,
                postText: req.body.darticle,
                postDate: Date.now(),
                commentNumber: 0
                // reacts: 0,
            });
            post.save();
            console.log(post);
            console.log('Post Added');
            res.redirect('/articles');
        // })
    },
    viewAllPost : function(req,res){
        Post.find({}, function(err, posts){
            if(err){
                console.log(err);
            } else{
                res.render('articles',{
                    posts: posts,
                    // UserLogged: false
                })
            }
        });
    },
    viewPost : function(req,res){

        var id = req.params._id;
        Post.find({_id:id}, function(err,posts){
            if (err){
                res.render('errorpage');
            }
            else{
                if (req.session.user)
                res.render('post',{
                    id: posts._id,
                    forumtitle: posts.title,
                    forumdate: posts.postDate,
                    forumauthor: posts.username,
                    forumpost: posts.postText,
                    commentcount: posts.commentNumber,
                    comments: posts.comments
                })
            }
        });
    },
    postComment: function(req,res){

        console.log(req.session.user);
    
        var objComment = {
            postNumber: req.params.id,
            username: req.user.username,
            commentText: req.body.newcom
        };
    
        Post.findOneAndUpdate({postNumber: req.params.id}, {$inc: {commentNumber: 1}} ,function(err,doc){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            
            doc.comments.push(objComment);
            console.log('Comment Posted');
            doc.save();
            res.redirect('/post/'+req.params.id);
        });
    
    },

    getEditPost: function(req,res){
        Post.findOne({_id:req.params.id}, function(err,doc){
            res.render('editpost',{
                title: doc.title,
                postText: doc.postText,
                id: req.params.id
            });
        })
    },

    postEditPost: function(req,res){
        Post.findOneAndUpdate({ _id: req.params.id}, {
            title: req.body.dtitle,
            postText: req.body.darticle,
        }, function(err,found){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            else{
                console.log('Post Updated');
                res.redirect('/viewall_post');
            }
        })
    },

    getDeletePost: function(req,res){
        Post.findOneAndDelete({postNumber: req.params.id}, function(err){
            if(err){
                return res.render('error');
                // console.log(err);
            }
            else{
                console.log("Post Deleted");
                res.redirect('/viewall_post');
            }
        })
    },

    getDeleteComment: function(req,res){
        Post.findOneAndUpdate({postNumber: req.params.id},{$inc: {commentNumber: -1}} ,function(err, doc){
            if(err){
                return res.render('error');
                // console.log(err)
            }
            doc.comments.pull({_id: req.params.text});
            console.log('Comment Deleted');
            doc.save();
            res.redirect('/post/'+req.params.id);
        })
    }
}
module.exports = postController;