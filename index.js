const express = require('express')
const app = express()
const port = 3000
const api = require('./tienda.json')

app.use(express.json())

app.get('/', (req, res) => {
    try {
        res.send('Bienvenido a la tienda')
    } catch (error) {
        res.send('ERROR: No has podido entrar a la tienda')
        console.log(error)
    }
})

app.get('/tienda', (req, res) => {
    try {
        res.json(api)
    } catch (error) {
        res.send('ERROR: No se han cargado los productos')
        console.log(error)
    }
})

app.post('/tienda', (req, res) => {
    try {
        const add = req.body
        api.push(add)
        res.json(api)
    } catch (error) {
        res.send('ERROR: No se ha podido añadir los productos a la tienda')
        console.log(error)
    }
})

app.put('/tienda/:id', (req, res) => {
    try {
        const buscar = api.find(product => product.id === parseInt(req.params.id))
        res.send(buscar)
    } catch (error) {
        res.send('ERROR: No se ha podido encontrar los productos de la tienda o bien no existen')
        console.log(error)
    }
})

app.delete('/tienda/:id', (req, res) => {
    try {
        const buscar = api.find(product => product.id === parseInt(req.params.id))
        const eliminar = api.splice(api.indexOf(buscar), 1)
        res.send(eliminar)
    } catch (error) {
        res.send('ERROR: No se ha podido eliminar los productos de la tienda')
        console.log(error)
    }
})

app.listen(port)
console.log(`Servidor escuchando en el puerto: ${port}`);