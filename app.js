const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const models = require('./models')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session');

function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.user) {
            next()
        }else {
            res.redirect('/login')
        }
    }else {
        res.redirect('/login')
    }
}

// const PORT = 3000
const PORT = process.env.PORT || 8080
const VIEWS_PATH = path.join(__dirname,'/views')


app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')
app.use(express.urlencoded());
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}))


const indexRouter = require('./routes/index.js')
app.use('/', indexRouter)

const loginRouter = require('./routes/login.js')
app.use('/login', loginRouter)

const accountRouter = require('./routes/account.js')
app.use('/account', authenticate, accountRouter)

const productsRouter = require('./routes/products.js')
app.use('/products', productsRouter)

const cartRouter = require('./routes/cart.js')
app.use('/cart', authenticate, cartRouter)



app.listen(PORT,() => console.log('Server is running...'))