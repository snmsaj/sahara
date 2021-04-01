const express = require('express');
const router = express.Router();
const models = require('../models')

router.post('/add-address', async (req,res) => {

    
    const body = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        userId: req.session.user.userId,
    }
        console.log(body)

    let persistedAddress = await models.Address.create(body)

    if(persistedAddress != null) {
        res.redirect('/products')
    } else {
        res.render('add-address', {message: "Unable to add address "})
    }
})

router.get('/add-address', (req,res) => {
    res.render('add-address')
})
 
router.get('/address', async (req,res) => {

    const userAddress = await models.Address.findAll({
        where: {
            userId: req.session.user.userId
        }
    })

    res.render('address', {addresses: userAddress})
})

module.exports = router;