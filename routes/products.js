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

//Add item to Carts table
router.post('/cart',async (req, res) => {
    const productId = parseInt(req.body.productId)
    const userId = parseInt(req.session.user.userId)
    const quantity = parseInt(req.body.quantity)

    const cartItem = models.Cart.build({
        productId: productId,
        userId: userId,
        quantity: quantity
    })
    console.log(cartItem)
    await cartItem.save().then(savedItem => {
        console.log("Item added to cart")
    }).catch((error) => {
        console.log(error)
    })
})

module.exports = router;