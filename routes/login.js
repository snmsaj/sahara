const express = require('express');
const router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

router.post('/register', async (req,res) => {

    let username = req.body.username
    let password = req.body.password 

    let persistedUser = await models.User.findOne({
        where: {
            username: username 
        }
    })

    if(persistedUser == null) {

        bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {

            if(error) {
                res.render('/register', {message: 'Error creating user!'})
            } else {

                let user = models.User.build({
                    username: username,
                    password: hash
                })


                let savedUser = await user.save()
                if(savedUser != null) {
                    res.redirect('/login')
                } else {
                    res.render('/register', {message: "User already exists!"})
                }

            }

        })

        
        

    } else {
        res.render('/register', {message: "User already exists!"})
    }
})

router.get('/register', (req,res) => {
    res.render('registration')
})

module.exports = router;