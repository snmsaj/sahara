const express = require('express');
const router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');

router.get('/', (req, res) => {
    const userId = parseInt(req.session.user.userId)
    // const productId = parseInt(req.session.product.productId)
console.log(req.session)
    models.Cart.findAll({
        where: {userId:userId},
        include:[{
            model:models.Product, 
            as:'item',
            where: {id:5}
        }]
    })
    .then(cartItem => {
        // const product = cartItem.item.map(info => {
        //     return info
        // })
        console.log(cartItem)
        res.render('cart', {cartItems:cartItem})
    })
})


module.exports = router;