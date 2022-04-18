const express = require('express');
const PORT = 8080;
const app = express();
const handlebars = require('express-handlebars');
//Me traigo mi clase contenedor para manejar productos
const { Contenedor } = require('./contenedor');
const contenedor = new Contenedor('./productos.json')

//para recibir json desde post
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Seteando las vistas y engine
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'./index.hbs',
        layoutsDir: __dirname + '/views/layaouts',
        partialsDir: __dirname + '/views/partials'
    })
);

// <!-- rutas GET! --->

app.get('/', (req, res)=>{
    res.render('NuevoProducto.hbs')
})

app.get('/productos', async(req, res)=>{
    const productos = await contenedor.getAll()
    res.render('Productos.hbs', {productos, productsExist: productos.length > 0 ? true : false})
})

// <!-- rutas POST! --->

app.post('/productos', async(req, res)=>{ //aca
    let producto =  req.body
    producto.price = parseInt(producto.price)
    let id = await contenedor.save(producto)
    res.render('NuevoProducto.hbs')
    console.log('se agrego producto nuevo con id: ' + id)
})








//Inicio el servidor.-
app.listen(PORT, (error)=>{
    if(error) throw new Error('Error de servidor: ' + error)
    console.log('Servidor escuchando en el puerto: ' + PORT)
})