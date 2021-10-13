const path = require('path')
const PUERTO = 3000
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
})

app.listen(PUERTO, () => console.log(`Servidor escuchando por el puerto ${PUERTO}`)
);