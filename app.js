const path = require('path')
const PUERTO = 3000
const express = require('express')
const app = express()
const methodOverride= require("method-override")

app.use(methodOverride("_method"))

app.use(express.static('public'))

app.set('view engine', 'ejs')

const mainRauters = require('./routers/mainRouters')
const productRouters = require('./routers/productRouters')
const userRouters = require('./routers/userRouters')


app.use('/', mainRauters)

app.use("/product", productRouters);

app.use("/user", userRouters);


/* app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
})
 */
app.listen(PUERTO, () => console.log(`Servidor escuchando por el puerto ${PUERTO}`)
);