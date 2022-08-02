class Producto {
    constructor(id, nombre, precioUnidad, stock, img){
    this.id = id
    this.nombre = nombre
    this.precioUnidad = precioUnidad
    this.stock = stock
    this.img = img
    }
    disminuirStock(){
        this.stock -= 1
    }
}
class ProductoEnCarrito {
    constructor(id, nombre, precioUnidad, cantidad, img, precioTotal){
        this.id = id
        this.nombre = nombre
        this.precioUnidad = precioUnidad
        this.cantidad = cantidad
        this.img = img
        this.precioTotal = precioTotal
    }
    actualizarProductoEnCarrito(){
        this.cantidad += 1
        this.precioTotal = this.precioUnidad * this.cantidad
    }
}
let carrito = []
const divCarritoDeCompras = document.getElementById("idDivCarritoDeCompras")
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
    let longitudArray = carrito.length
    carrito.forEach(productoEnCarrito => {
        productoEnCarrito = new ProductoEnCarrito(productoEnCarrito.id, productoEnCarrito.nombre, productoEnCarrito.precioUnidad, productoEnCarrito.cantidad, productoEnCarrito.img, productoEnCarrito.precioTotal)
        carrito.push(productoEnCarrito)
        divCarritoDeCompras.innerHTML += `
        <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
            <div class="imagenProductoEnCarrito">
                <img src="${productoEnCarrito.img}">
            </div>
            <div class="tituloPrecioCantidadProductoEnCarrito">
                <div class="tituloProductoEnCarrito">
                    <h6>${productoEnCarrito.nombre}</h6>
                </div>
                <div class="precioCantidadProductoEnCarrito">
                    <h6>$ ${productoEnCarrito.precioTotal}</h6>
                    <input type="number" value="${productoEnCarrito.cantidad}">
                </div>
            </div>
            <div class="eliminarProductoEnCarrito">
                <button>X</button>
            </div>
        </div>
        `
    })
    carrito.splice(0, longitudArray)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarTotalAPagar(carrito)
}
function actualizarLocalStorage(carrito) {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        let longitudArray = carrito.length
        divCarritoDeCompras.innerHTML = ``
        carrito.forEach(productoEnCarrito => {
            productoEnCarrito = new ProductoEnCarrito(productoEnCarrito.id, productoEnCarrito.nombre, productoEnCarrito.precioUnidad, productoEnCarrito.cantidad, productoEnCarrito.img, productoEnCarrito.precioTotal)
            carrito.push(productoEnCarrito)
            divCarritoDeCompras.innerHTML += `
            <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
                <div class="imagenProductoEnCarrito">
                    <img src="${productoEnCarrito.img}">
                </div>
                <div class="tituloPrecioCantidadProductoEnCarrito">
                    <div class="tituloProductoEnCarrito">
                        <h6>${productoEnCarrito.nombre}</h6>
                    </div>
                    <div class="precioCantidadProductoEnCarrito">
                        <h6>$ ${productoEnCarrito.precioTotal}</h6>
                        <input type="number" value="${productoEnCarrito.cantidad}">
                    </div>
                </div>
                <div class="eliminarProductoEnCarrito">
                    <button>X</button>
                </div>
            </div>
            `
        })
        carrito.splice(0, longitudArray)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

const producto1 = new Producto (0, "oráculo conexión con el universo box", 3990, 20, "../images/productos/cartas/universobox.jpg")
const producto2 = new Producto (1, "oráculo conexión con el universo simple", 2650, 35, "../images/productos/cartas/universosolo.jpg")
const producto3 = new Producto (2, "lectura de cartas 45min", 4800, 100000, "../images/productos/tarot.jpg")
const producto4 = new Producto (3, "kit personal 7 chakras", 2650, 12, "../images/productos/limpieza/chakras.jpg")
const producto5 = new Producto (4, "spry limpieza energética sandalo y champa", 650, 16, "../images/productos/limpieza/sandaloychampa.jpg")
const producto6 = new Producto (5, "spry limpieza energética de descarga", 650, 11, "../images/productos/limpieza/limpieza.jpg")
const producto7 = new Producto (6, "spry limpieza energética ruda y romero", 690, 19, "../images/productos/limpieza/rudayromero.jpg")
const producto8 = new Producto (7, "spry limpieza energética abundancia y fortuna", 780, 25, "../images/productos/limpieza/abundanciayfortuna.jpg")
const producto9 = new Producto (8, "vela de soja de la abundancia y fortuna", 890, 2, "../images/productos/velas/abundancia.jpg")
const producto10 = new Producto (9, "vela de soja del amor", 890, 22, "../images/productos/velas/amor.jpg")
const producto11 = new Producto (10, `vela de soja "buda"`, 950, 20, "../images/productos/velas/buda.jpg")
const producto12 = new Producto (11, "vela de soja de limpieza energética", 920, 20, "../images/productos/velas/limpieza.jpg")
const producto13 = new Producto (12, "vela de soja de la seducción", 990, 9, "../images/productos/velas/seduccion.jpg")

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13]

const divProductos = document.getElementById("idDivProductos")
productos.forEach((producto) => {
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
                        $${producto.precioUnidad}
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
const inputBusqueda = document.getElementById("idInputBusqueda")
const botonBusqueda = document.getElementById("idBotonBusqueda")
botonBusqueda.addEventListener("change", (event) =>{
    event.preventDefault()
    busquedaDeProductos(inputBusqueda.value)
})
botonBusqueda.addEventListener("click", (event) =>{
    event.preventDefault()
    busquedaDeProductos(inputBusqueda.value)
})
function busquedaDeProductos(inputBusqueda){
    resultadosDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputBusqueda.toLowerCase()))
    mostrarBusquedaDeProductos(resultadosDeBusqueda)
}
function mostrarBusquedaDeProductos(resultadosDeBusqueda){
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
                            $${producto.precioUnidad}
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
    añadirProductoACarrito(resultadosDeBusqueda)
}
productos.forEach((producto) =>{
    const botonAgregarACarrito = document.getElementById(`producto${producto.id}`).lastElementChild.lastElementChild
    botonAgregarACarrito.addEventListener("click", () => {
        let productoSeleccionado = new ProductoEnCarrito (
            producto.id,
            producto.nombre,
            producto.precioUnidad,
            0,
            producto.img,
            0
        )
        if(carrito.some(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)){
            let productoExistente = carrito.find(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)
            productoExistente.actualizarProductoEnCarrito()
            actualizarPrecioYCantidad(carrito)
            actualizarTotalAPagar(carrito)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }else{
            let productoEnCarrito = productoSeleccionado
            productoEnCarrito.actualizarProductoEnCarrito()
            carrito.push(productoEnCarrito)
            divCarritoDeCompras.innerHTML += `
            <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
                <div class="imagenProductoEnCarrito">
                    <img src="${productoEnCarrito.img}">
                </div>
                <div class="tituloPrecioCantidadProductoEnCarrito">
                    <div class="tituloProductoEnCarrito">
                        <h6>${productoEnCarrito.nombre}</h6>
                    </div>
                    <div class="precioCantidadProductoEnCarrito">
                        <h6>$ ${productoEnCarrito.precioTotal}</h6>
                        <input type="number" value="${productoEnCarrito.cantidad}">
                    </div>
                </div>
                <div class="eliminarProductoEnCarrito">
                    <button>X</button>
                </div>
            </div>
            `
            actualizarPrecioYCantidad(carrito)
            actualizarTotalAPagar(carrito)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
        eliminarProducto(carrito)
    })
})
function añadirProductoACarrito(resultadosDeBusqueda){
    resultadosDeBusqueda.forEach((producto) =>{
        const botonAgregarACarrito = document.getElementById(`producto${producto.id}`).lastElementChild.lastElementChild
        botonAgregarACarrito.addEventListener("click", () => {
            let productoSeleccionado = new ProductoEnCarrito (
                producto.id,
                producto.nombre,
                producto.precioUnidad,
                0,
                producto.img,
                0
            )
            if(carrito.some(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)){
                let productoExistente = carrito.find(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)
                productoExistente.aumentarCantidad()
                productoExistente.actualizarPrecioTotal()
                actualizarPrecioYCantidad(carrito)
                actualizarTotalAPagar(carrito)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }else{
                let productoEnCarrito = productoSeleccionado
                productoEnCarrito.aumentarCantidad()
                productoEnCarrito.actualizarPrecioTotal()
                carrito.push(productoEnCarrito)
                divCarritoDeCompras.innerHTML += `
                <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
                    <div class="imagenProductoEnCarrito">
                        <img src="${productoEnCarrito.img}">
                    </div>
                    <div class="tituloPrecioCantidadProductoEnCarrito">
                        <div class="tituloProductoEnCarrito">
                            <h6>${productoEnCarrito.nombre}</h6>
                        </div>
                        <div class="precioCantidadProductoEnCarrito">
                            <h6>$ ${productoEnCarrito.precioTotal}</h6>
                            <input type="number" value="${productoEnCarrito.cantidad}">
                        </div>
                    </div>
                    <div class="eliminarProductoEnCarrito">
                        <button>X</button>
                    </div>
                </div>
                `
                actualizarPrecioYCantidad(carrito)
                actualizarTotalAPagar(carrito)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }
            eliminarProducto(carrito)
        })
    })
}
function eliminarProducto(carrito){
    carrito.forEach((productoEnCarrito) => {
        const botonEliminarProductoDeCarrito = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).lastElementChild.lastElementChild
        botonEliminarProductoDeCarrito.addEventListener("click", () => {
            productoAEliminar = carrito.indexOf(productoEnCarrito)
            document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).remove()
            carrito.splice(productoAEliminar, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            actualizarTotalAPagar(carrito)
            actualizarLocalStorage(carrito)
            eliminarProducto(carrito)
        })
    })
}
carrito.forEach((productoEnCarrito) => {
    const botonEliminarProductoDeCarrito = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).lastElementChild.lastElementChild
    botonEliminarProductoDeCarrito.addEventListener("click", () => {
        productoAEliminar = carrito.indexOf(productoEnCarrito)
        document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).remove()
        carrito.splice(productoAEliminar, 1)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarTotalAPagar(carrito)
        actualizarLocalStorage(carrito)
        eliminarProducto(carrito)
    })
})
function actualizarPrecioYCantidad(carrito){
    carrito.forEach((productoEnCarrito) => {
        const inputCantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1]
        inputCantidadAComprar.value = productoEnCarrito.cantidad
        const divPrecioTotal = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[0]
        divPrecioTotal.textContent = "$ " + productoEnCarrito.precioTotal
    })
}

function actualizarTotalAPagar(carrito){
    let acumulador = 0
    const totalAPagarPorProducto = (carrito.map(productoEnCarrito => productoEnCarrito.precioTotal))
    totalAPagarPorProducto.forEach((totalPorProducto) => {
        acumulador += totalPorProducto
    })
    const totalAPagar = document.getElementById(`idTotalAPagar`)
    totalAPagar.textContent = ": $ " + acumulador
}