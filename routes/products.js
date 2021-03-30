const express = require('express');
const router = express.Router();
const models = require('../models')

//Render the water onto the water page
router.get('/water', (req, res) => {
    models.Product.findAll({
        where: {
            category:'Water'
        }
    }).then(water => {
        res.render('water', {water:water})
    })
})


module.exports = router;