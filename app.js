const path = require('path')
const PUERTO = 3000
const express = require('express')
const app = express()

const methodOverride= require("method-override")
const session = require('express-session')

app.use(methodOverride("_method"))
app.use(express.static('public'))

/* Captura la información que se envía de un formulario por POST */
app.use(express.urlencoded({ extended: false }));

//Se requeire la librería para manejo de cookie
//Por que debe ir encima del session?
const cookies = require('cookie-parser')
app.use(cookies())

//Se inicializa el Middleware de Sesión
app.use(session({
    secret: 'Es una frase secreta',
    resave: false,
    saveUninitialized: false
}))

//Valida si hay un usuario logueado
//Debe ir despúes del Middleware de la sesión.
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
app.use(userLoggedMiddleware)




app.set('view engine', 'ejs')

const mainRauters = require('./routers/mainRouters')
const productRouters = require('./routers/productRouters')
const userRouters = require('./routers/userRouters')
const apiUserRoutes = require('./routers/apiRoutes/apiUserRoutes');
const apiProductsRoutes = require('./routers/apiRoutes/apiProductsRoutes');
const apiCategoriesRoutes = require('./routers/apiRoutes/apiCategoriesRoutes');
const apiSalesInvoiceRoutes = require('./routers/apiRoutes/apiSalesInvoiceRoutes')


app.use('/', mainRauters)

app.use("/product", productRouters);

app.use("/user", userRouters);

app.use("/api", apiUserRoutes);
app.use("/api", apiProductsRoutes);
app.use("/api", apiCategoriesRoutes);
app.use("/api", apiSalesInvoiceRoutes)


/* app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
})
 */
app.listen(PUERTO, () => console.log(`Servidor escuchando por el puerto ${PUERTO}`)
);