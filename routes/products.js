const express = require("express");
const router = express.Router();
const models = require("../models");

//Render the water onto the water page
router.get("/water", (req, res) => {
    models.Product.findAll({
        where: {
            category: "Water",
        },
    }).then((water) => {
        res.render("water", { water: water });
    });
});

//Render tea page
router.get("/tea", (req, res) => {
    models.Product.findAll({
        where: {
            category: "Tea",
        },
    }).then((tea) => {
        res.render("tea", { tea: tea });
    });
});

//Render all items
router.get("/", (req, res) => {
    models.Product.findAll({
    }).then((items) => {
        res.render("all-items", { items: items });
    });
});

//Goes to page that shows the item you click on
router.get("/:category/:name", (req, res) => {
    const productName = req.params.name

    models.Product.findOne({
        where:{
            name:productName
        }
    }).then ((product) => {
        res.render('item', {product:product})
    })
})

module.exports = router;
