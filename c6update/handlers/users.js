var user = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const viewEditUser = (req, res) => {
    let user_id = req.params.id;
    res.render('users_edit', { user_id: user_id });
}
const viewNewUser = (req, res) => {

    res.render('new_user');
}
const apiNewUser = (req, res) => {
    if(req.body.first_name !== undefined && req.body.first_name.length > 0 &&
        req.body.last_name !== undefined && req.body.last_name.length > 0 &&
        req.body.email !== undefined && req.body.email.length > 0 &&
        req.body.password !== undefined && req.body.password.length > 0 &&
        req.body.password2 !== undefined && req.body.password2.length > 0 &&
        req.body.password2 === req.body.password
    ){
        let hash = bcrypt.hashSync(
            req.body.password, 
            bcrypt.genSaltSync(10)
        );

        user.createNew({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        })
        .then(() => {
            res.redirect('/dashboard');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/register?err=1')
        });
    } else {
        res.redirect('/register?err=2');
    }
}

const apiEditUser = (req, res) => {
        let id = req.body.id
        let hash = bcrypt.hashSync(
            req.body.password, 
            bcrypt.genSaltSync(10)
        );
        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: String(req.body.email),
            password:hash      
        }
        return new Promise((success, fail)=>{
            user.updateItem({_id: id}, data, (err)=>{
                if(err){
                    return fail(err);
                }
                return success();
            })
            res.redirect('/dashboard')
        })
    }

const apiDeleteUser = (req, res) => {
   
    let id = req.params.id;
    console.log(id)
    user.removeItem(id)
        .then(() =>
            res.redirect('/dashboard')
        )
        .catch(err => {
            console.log('Error has occured while deleting the user')
            res.status(500).send('Could not delete user')
            return
        })
        }

module.exports = {
    viewEditUser,
    apiEditUser,
    viewNewUser,
    apiNewUser ,
    apiDeleteUser
}