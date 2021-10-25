const path = require('path')
const PUERTO = 3000
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
})

app.get('/login-2', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login-2.html'));
})

app.get('/product-cart', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'));
})

app.get('/product-details', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetails.html'));
})

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/registro.html'));
})

app.listen(PUERTO, () => console.log(`Servidor escuchando por el puerto ${PUERTO}`)
);