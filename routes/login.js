const express = require('express');
const router = express.Router();
const models = require('../models')
const session = require('express-session');
const bcrypt = require('bcrypt')


const SALT_ROUNDS = 10


router.post('/', async(req, res) => {

    let username = req.body.username
    let password = req.body.password
    
    let user = await models.User.findOne({
        where: {
            username
        }
    })

    if(user != null) {

        const match = await bcrypt.compare(password, user.password);

        if(match){
            //create session 
            if(req.session) {
                req.session.user = {userId: user.id}
                res.redirect('/account/products')
            }
        }else{
            res.render('login', {message: "Incorrect login credentials. Please try again"});
        }

    } else {
        res.render('login', {message: "Incorrect login credentials. Please try again"})
    }
})


router.get('/', (req,res) => {
    res.render('login')
})



module.exports = router;