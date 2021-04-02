const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', (req, res) => {
    const userId = parseInt(req.session.user.userId)

    models.Cart.findByPk(userId, {
        include: [
            {
                model: models.User,
                as: 'cartItems'
            }
        ]
    })
    .then(cartItem => {
        console.log(cartItem)
    })
})


module.exports = router;