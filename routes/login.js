const express = require('express');
const router = express.Router();
const models = require('../models')


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



router.post('/register', async (req,res) => {

    let username = req.body.username
    let password = req.body.password 

    let persistedUser = await models.User.findOne({
        where: {
            username: username 
        }
    })

    if(persistedUser == null) {

        let user = models.User.build({
            username: username,
            password: password
        })

        let savedUser = await user.save()
        if(savedUser != null) {
            res.redirect('/login')
        } else {
            res.render('/register', {message: "User already exists!"})
        }

    } else {
        res.render('/register', {message: "User already exists!"})
    }
})

router.get('/register', (req,res) => {
    res.render('registration')
})

module.exports = router;