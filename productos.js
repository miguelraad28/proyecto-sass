const productos = 
[{id: 0, nombre: "oráculo conexión con el universo box", precio: 3990, stock: 20, img:"../images/productos/cartas/universobox.jpg", cantidad: 0},
{id: 1, nombre: "oráculo conexión con el universo simple", precio: 2650, stock: 35, img:"../images/productos/cartas/universosolo.jpg", cantidad: 0},
{id: 2, nombre: "lectura de cartas 45min", precio: 4800, stock: 100000, img:"../images/productos/tarot.jpg", cantidad: 0},
{id: 3, nombre: "kit personal 7 chakras", precio: 2650, stock: 12, img:"../images/productos/limpieza/chakras.jpg", cantidad: 0},
{id: 4, nombre: "spry limpieza energética sandalo y champa", precio: 650, stock: 16, img:"../images/productos/limpieza/sandaloychampa.jpg", cantidad: 0},
{id: 5, nombre: "spry limpieza energética de descarga", precio: 650, stock: 11, img:"../images/productos/limpieza/limpieza.jpg", cantidad: 0},
{id: 6, nombre: "spry limpieza energética ruda y romero", precio: 690, stock: 19, img:"../images/productos/limpieza/rudayromero.jpg", cantidad: 0},
{id: 7, nombre: "spry limpieza energética abundancia y fortuna", precio: 780, stock: 25, img:"../images/productos/limpieza/abundanciayfortuna.jpg", cantidad: 0},
{id: 8, nombre: "vela de soja de la abundancia y fortuna", precio: 890, stock: 2, img:"../images/productos/velas/abundancia.jpg", cantidad: 0},
{id: 9, nombre: "vela de soja del amor", precio: 890, stock: 22, img:"../images/productos/velas/amor.jpg", cantidad: 0},
{id: 10, nombre: `vela de soja "buda"`, precio: 950, stock: 20, img:"../images/productos/velas/buda.jpg", cantidad: 0},
{id: 11, nombre: "vela de soja de limpieza energética", precio: 920, stock: 20, img:"../images/productos/velas/limpieza.jpg", cantidad: 0},
{id: 12, nombre: "vela de soja de la seducción", precio: 990, stock: 9, img:"../images/productos/velas/seduccion.jpg", cantidad: 0},]

const divProductos = document.getElementById("idDivProductos")
productos.forEach((producto, id) => {
    divProductos.innerHTML += `
    <div class="producto">
        <div class="contenedor-producto-interno" id="producto${id}">
            <a href="#">
                <div>
                    <img class="img-fluid imagen-producto" src="${producto.img}">
                </div>
                <div class="titulo-producto">
                    <h3 class="nombre-producto" style="text-transform: uppercase;">
                        ${producto.nombre}
                    </h3>
                    <h3 class="precio-producto">
                        $${producto.precio}
                    </h3>
                </div>
            </a>
            <div class="div-boton-agregar">
                <button>Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
})

let carrito = []
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito.forEach(producto => {
        divCarritoDeCompras.innerHTML += `
        <div class="productoEnCarrito" id="${producto.id}">
            <div class="imagenProductoEnCarrito">
                <img src="${producto.img}">
            </div>
            <div class="tituloPrecioCantidadProductoEnCarrito">
                <div class="tituloProductoEnCarrito">
                    <h6>${producto.nombre}</h6>
                </div>
                <div class="precioCantidadProductoEnCarrito">
                    <h6>$ ${producto.precio}</h6>
                    <input type="number" value="${producto.cantidad}">
                </div>
            </div>
            <div class="eliminarProductoEnCarrito">
                <button>X</button>
            </div>
        </div>
        `
    })
}else{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const inputBusqueda = document.getElementById("idInputBusqueda")
const botonBusqueda = document.getElementById("idBotonBusqueda")
botonBusqueda.addEventListener("change", (event) =>{
    event.preventDefault()
    funcionBusqueda(inputBusqueda.value)
})
botonBusqueda.addEventListener("click", (event) =>{
    event.preventDefault()
    funcionBusqueda(inputBusqueda.value)
})
function funcionBusqueda(inputBusqueda){
    const resultadosDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputBusqueda.toLowerCase()))
    funcionMostrarHTML(resultadosDeBusqueda)
}
function funcionMostrarHTML(resultadosDeBusqueda){
    divProductos.innerHTML = ``
    for(let producto of resultadosDeBusqueda){
        divProductos.innerHTML += `
        <div class="producto">
            <div class="contenedor-producto-interno" id="producto${producto.id}">
                <a href="#">
                    <div>
                        <img class="img-fluid imagen-producto" src="${producto.img}">
                    </div>
                    <div class="titulo-producto">
                        <h3 class="nombre-producto" style="text-transform: uppercase;">
                            ${producto.nombre}
                        </h3>
                        <h3 class="precio-producto">
                            $${producto.precio}
                        </h3>
                    </div>
                </a>
                <div class="div-boton-agregar">
                    <button>Agregar al carrito</button>
                </div>
            </div>
        </div>
        `
    }
}
productos.forEach((producto) => {
    let botonAgregarACarrito = document.getElementById(`producto${producto.id}`).lastElementChild.lastElementChild
    botonAgregarACarrito.addEventListener("click", () =>{
        producto.cantidad += 1
        carrito.push(producto);
        console.log(carrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
})
function mostrarEnCarrito(productos){
    divCarritoDeCompras.innerHTML += `
    <div class="productoEnCarrito" id="${producto.id}">
        <div class="imagenProductoEnCarrito">
            <img src="${producto.img}">
        </div>
        <div class="tituloPrecioCantidadProductoEnCarrito">
            <div class="tituloProductoEnCarrito">
                <h6>${producto.nombre}</h6>
            </div>
            <div class="precioCantidadProductoEnCarrito">
                <h6>$ ${producto.precio}</h6>
                <input type="number" value="${producto.cantidad}">
            </div>
        </div>
        <div class="eliminarProductoEnCarrito">
            <button>X</button>
        </div>
    </div>
    `
}