const express = require('express');
const app = express();
const PORT = 5000;

//Clase contenedor
const { Contenedor } = require('./contenedor');
const contenedor = new Contenedor('./productos.json')

//para recibir json desde metodo post
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Seteando las vistas y engine
app.set('view engine', 'ejs');
// app.set('views', './views');
app.use(express.static('public'));

// <!-- Rutas GET -->
app.get('/', (req, res)=>{
    res.render('pages/nuevoProducto')
})

app.get('/productos', async(req, res)=>{
    const productos = await contenedor.getAll()
    res.render('pages/productos', {productos})
})

// <!-- Ruta POST -->
app.post('/productos', async(req, res)=>{
    let producto =  req.body
    producto.price = parseInt(producto.price)
    let id = await contenedor.save(producto)
    res.render('pages/nuevoProducto')
    console.log(`Se agrego el producto ${producto.title} con id: ${id}`)
})

//Inicio el servidor.-
app.listen(PORT, (error)=>{
    if(error) throw new Error('Error de servidor: ' + error)
    console.log('Servidor escuchando en el puerto: ' + PORT)
})