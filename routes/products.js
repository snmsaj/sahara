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



module.exports = router;
