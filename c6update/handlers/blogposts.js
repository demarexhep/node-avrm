var blogposts = require('../models/blogposts');
var jwt = require('jsonwebtoken');

const tokenKey = 'pwd123!';


const viewBlogposts = (req, res) => {
    blogposts.readAll()
        .then(data => {
            res.render('blogposts', { blogposts: data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('internal server error');
        });

}

const viewNewBlogpost = (req, res) => {
    res.render('newblog')
}

const apiNewBlogpost = (req, res) => {
    let cookiejwt = req.cookies.jwt;
    //console.log(cookiejwt)
    let decoded = jwt.verify(cookiejwt, tokenKey)
    console.log(decoded.email)
    blogposts.createNew({
        email: decoded.email,
        content: req.body.content
    })
        .then(() => {
            console.log('Successfully created a new content!')
            res.redirect('/blogposts');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogposts/new?err=1')
        });
}

const viewEditBlogpost = (req, res) => {
    let blog_id = req.params.id;
    blogposts.readOne(blog_id)
    .then(data => {
        console.log(data)
        res.render('editblog', {blog_id:blog_id, blogs: data});
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
}

const apiEditBlogpost = (req, res) => {
    let id = req.body.id;
    let data = {
        content: req.body.content
    }
    console.log(id)
    console.log(data)
    blogposts.update(id,data)
    .then(()=>{
        console.log('Successfully uptaded the blog post')
        res.redirect('/blogposts')
    })
    .catch(err=> {
        console.log('Error has occured while updating the post')
        res.status(500).send('Could not update the post')
    })
}

const apiDeleteBlogpost = (req, res) => {
    let id = req.params.id;
    console.log(id)
    blogposts.remove(id)
        .then(() =>
            res.redirect('/blogposts')
        )
        .catch(err => {
            console.log('Error has occured while deleting the user')
            res.status(500).send('Could not delete user')
            return
        })
}

module.exports = {
    viewBlogposts,
    viewNewBlogpost,
    apiNewBlogpost,
    viewEditBlogpost,
    apiEditBlogpost,
    apiDeleteBlogpost,
}