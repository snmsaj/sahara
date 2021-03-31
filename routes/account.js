const express = require('express');
const router = express.Router();
const models = require('../models')

router.post('/add-address', async (req,res) => {

    
    const body = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        userId: req.body.id //req.session.user.userId,
    }

    let persistedAddress = await models.Address.create(body)

    if(persistedAddress != null) {
        res.redirect('/user/products')
    } else {
        res.render('user/add-address', {message: "Unable to add address "})
    }
})


 


module.exports = router;