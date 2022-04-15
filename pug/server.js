const express = require('express');
const PORT = 3000;
const app = express();

//Me traigo mi clase contenedor para manejar productos
const { Contenedor } = require('./contenedor');
const contenedor = new Contenedor('./productos.json')

//para recibir json desde post
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Seteando las vistas y engine
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

// app.engine(
//     'hbs',
//     handlebars.engine({
//         extname:'.hbs',
//         defaultLayout:'./index.hbs',
//         layoutsDir: __dirname + '/views/layaouts',
//         partialsDir: __dirname + '/views/partials'
//     })
// );

// <!-- rutas GET! --->

app.get('/', (req, res)=>{
    res.render('nuevoProducto.pug')
})

app.get('/productos', async(req, res)=>{
    const productos = await contenedor.getAll()
    res.render('productos.pug', {productos})
})

// <!-- rutas POST! --->

app.post('/productos', async(req, res)=>{ //aca
    let producto =  req.body
    producto.price = parseInt(producto.price)
    let id = await contenedor.save(producto)
    res.render('nuevoProducto.pug')
    console.log('se agrego producto nuevo con id: ' + id)
})








//Inicio el servidor.-
app.listen(PORT, (error)=>{
    if(error) throw new Error('Error de servidor: ' + error)
    console.log('Servidor escuchando en el puerto: ' + PORT)
})