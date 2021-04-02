const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', (req, res) => {
    const userId = parseInt(req.session.user.userId)

    
})


module.exports = router;