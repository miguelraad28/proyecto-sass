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
const productos = 
[{id: 0, nombre: "oráculo conexión con el universo box", precio: 3990, stock: 20, img:"../images/productos/cartas/universobox.jpg"},
{id: 1, nombre: "oráculo conexión con el universo simple", precio: 2650, stock: 35, img:"../images/productos/cartas/universosolo.jpg"},
{id: 2, nombre: "lectura de cartas 45min", precio: 4800, stock: 100000, img:"../images/productos/tarot.jpg"},
{id: 3, nombre: "kit personal 7 chakras", precio: 2650, stock: 12, img:"../images/productos/limpieza/chakras.jpg"},
{id: 4, nombre: "spry limpieza energética sandalo y champa", precio: 650, stock: 16, img:"../images/productos/limpieza/sandaloychampa.jpg"},
{id: 5, nombre: "spry limpieza energética de descarga", precio: 650, stock: 11, img:"../images/productos/limpieza/limpieza.jpg"},
{id: 6, nombre: "spry limpieza energética ruda y romero", precio: 690, stock: 19, img:"../images/productos/limpieza/rudayromero.jpg"},
{id: 7, nombre: "spry limpieza energética abundancia y fortuna", precio: 780, stock: 25, img:"../images/productos/limpieza/abundanciayfortuna.jpg"},
{id: 8, nombre: "vela de soja de la abundancia y fortuna", precio: 890, stock: 2, img:"../images/productos/velas/abundancia.jpg"},
{id: 9, nombre: "vela de soja del amor", precio: 890, stock: 22, img:"../images/productos/velas/amor.jpg"},
{id: 10, nombre: `vela de soja "buda"`, precio: 950, stock: 20, img:"../images/productos/velas/buda.jpg"},
{id: 11, nombre: "vela de soja de limpieza energética", precio: 920, stock: 20, img:"../images/productos/velas/limpieza.jpg"},
{id: 12, nombre: "vela de soja de la seducción", precio: 990, stock: 9, img:"../images/productos/velas/seduccion.jpg"},]

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
let productoAñadido
productos.forEach((producto) => {
    let botonAgregarACarrito = document.getElementById(`producto${producto.id}`).lastElementChild.lastElementChild
    botonAgregarACarrito.addEventListener("click", () =>{
        productoAñadido = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img,
            cantidad: cantidad = 0
        }
        if(carrito.some(productoEnCarrito => productoEnCarrito.id === productoAñadido.id)){
            productoAñadido = carrito.find(productoEnCarrito => productoEnCarrito.id === productoAñadido.id)
            productoAñadido.cantidad += 1
            console.log(carrito)
            const inputCantidadAComprar = document.getElementById(`${productoAñadido.id}`).children[1].children[1].children[1]
            inputCantidadAComprar.value = productoAñadido.cantidad
        }else{
            productoAñadido.cantidad += 1
            carrito.push(productoAñadido);
            divCarritoDeCompras.innerHTML += `
            <div class="productoEnCarrito" id="${productoAñadido.id}">
                <div class="imagenProductoEnCarrito">
                    <img src="${productoAñadido.img}">
                </div>
                <div class="tituloPrecioCantidadProductoEnCarrito">
                    <div class="tituloProductoEnCarrito">
                        <h6>${productoAñadido.nombre}</h6>
                    </div>
                    <div class="precioCantidadProductoEnCarrito">
                        <h6>$ ${productoAñadido.precio}</h6>
                        <input type="number" value="${productoAñadido.cantidad}">
                    </div>
                </div>
                <div class="eliminarProductoEnCarrito">
                    <button>X</button>
                </div>
            </div>
            `
            console.log(carrito)
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
})
/*const inputCantidadAComprar = document.getElementById(`${productoAñadido.id}`).children[1].children[1].children[1]
inputCantidadAComprar.addEventListener("click", () =>{
    // llamar al producto en carrito por id y inputCantidadAComprar = productoEnCarrito.cantidad
    // Asi puedo cambiar la cantidad a comprar con los botones del input
})*/