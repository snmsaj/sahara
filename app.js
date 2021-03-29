const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const path = require('path')
const session = require('express-session');

const PORT = 3000
const VIEWS_PATH = path.join(__dirname,'/views')


app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')
app.use(express.urlencoded());
app.use(express.static('css'));
app.use(express.static('js'));
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
app.use('/account', accountRouter)

const productsRouter = require('./routes/products.js')
app.use('/products', productsRouter)

const cartRouter = require('./routes/cart.js')
app.use('/products', cartRouter)



app.listen(PORT,() => console.log('Server is running...'))