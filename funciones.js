import {carrito, divCarritoDeCompras} from "./carrito.js"
const divProductos = document.getElementById("idDivProductos")
function noHayMasEnStock(){
    Toastify({
        text: "No hay más en stock, lo sentimos.",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            color: "black",
            background: "linear-gradient(to top, #FF656E, #FF65A6)",
        },
    }).showToast();
}
function cambiarCantidadPorBotones(carrito){
    carrito.forEach((productoEnCarrito) => {
        const cantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1].children[1]
        const sumarCantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1].children[2]
        const restarCantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1].children[0]
        sumarCantidadAComprar.addEventListener("click", () => {
            if(productoEnCarrito.cantidad == productoEnCarrito.stock){
                noHayMasEnStock()
            }else{
                productoEnCarrito.cantidad += 1
                productoEnCarrito.precioTotal = productoEnCarrito.cantidad * productoEnCarrito.precioUnidad
                actualizarPrecioYCantidad(carrito)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
        restarCantidadAComprar.addEventListener("click", () => {
            if(cantidadAComprar.textContent == 1){
            }else{
                productoEnCarrito.cantidad -= 1
                productoEnCarrito.precioTotal = productoEnCarrito.cantidad * productoEnCarrito.precioUnidad
                actualizarPrecioYCantidad(carrito)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
    })
    
}
function actualizarProductoEnCarrito(producto){
    producto.cantidad++
    producto.precioTotal = producto.precioUnidad * producto.cantidad
}
function actualizarPrecioYCantidad(carrito){
    carrito.forEach((productoEnCarrito) => {
        const cantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1].children[1]
        cantidadAComprar.textContent = productoEnCarrito.cantidad
        const divPrecioTotal = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[0]
        divPrecioTotal.textContent = `$${productoEnCarrito.precioTotal}`
    })
}
function actualizarTotalDeCarrito(carrito){
    let acumulador = 0
    const totalAPagarPorProducto = (carrito.map(productoEnCarrito => productoEnCarrito.precioTotal))
    totalAPagarPorProducto.forEach((totalPorProducto) => {
        acumulador += totalPorProducto
    })
    const totalAPagar = document.getElementById(`idTotalAPagar`)
    totalAPagar.innerHTML = `: <b>$${acumulador}</b>`
}
function eliminarProducto(carrito){
    carrito.forEach((productoEnCarrito) => {
        const botonEliminarProductoDeCarrito = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).lastElementChild.lastElementChild
        botonEliminarProductoDeCarrito.addEventListener("click", () => {
            document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).remove()
            carrito.splice(carrito.indexOf(productoEnCarrito), 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            actualizarTotalDeCarrito(carrito)
            Toastify({
                text: "Producto eliminado.",
                duration: 1200,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    color: "white",
                    background: "linear-gradient(to top, #C2005E, #D5007B)",
                },
            }).showToast();
        })
    })
}
function añadirProductoExistenteACarrito(productoSeleccionado){
    let productoExistente = carrito.find(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)
    if(productoExistente.cantidad == productoExistente.stock){
        noHayMasEnStock()
    }else{
        actualizarProductoEnCarrito(productoExistente)
        actualizarPrecioYCantidad(carrito)
        actualizarTotalDeCarrito(carrito)
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color: "black",
                background: "linear-gradient(to top, #ffb3d3, #ffc2dc)",
            },
        }).showToast();
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}
function añadirProductoNuevoACarrito(productoSeleccionado){
    if(productoSeleccionado.stock <= 0){
        noHayMasEnStock()
    }else{
        let productoEnCarrito = productoSeleccionado
        actualizarProductoEnCarrito(productoEnCarrito)
        carrito.push(productoEnCarrito)
        divCarritoDeCompras.innerHTML += `
        <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
            <div class="imagenProductoEnCarrito">
                <img src="../images/${productoEnCarrito.img}">
            </div>
            <div class="tituloPrecioCantidadProductoEnCarrito">
                <div class="tituloProductoEnCarrito">
                    <h6>${productoEnCarrito.nombre}</h6>
                </div>
                <div class="precioCantidadProductoEnCarrito">
                    <h6>$ ${productoEnCarrito.precioTotal}</h6>
                    <div class="btn-group botonesCantidadProductoEnCarrito" role="group">
                        <button type="button" class="btn btn-outline-danger">-</button>
                        <button type="button" class="btn-cantidad">${productoEnCarrito.cantidad}</button>
                        <button type="button" class="btn btn-outline-success">+</button>
                    </div>
                </div>
            </div>
            <div class="eliminarProductoEnCarrito">
                <button>X</button>
            </div>
        </div>
        `
        actualizarPrecioYCantidad(carrito)
        actualizarTotalDeCarrito(carrito)
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color: "black",
                background: "linear-gradient(to top, #ffb3d3, #ffc2dc)",
            },
        }).showToast();
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    eliminarProducto(carrito)
}
function listenerAgregarACarrito(productos){
    productos.forEach((producto) =>{
        const botonAgregarACarrito = document.getElementById(`producto${producto.id}`).lastElementChild.lastElementChild
        botonAgregarACarrito.addEventListener("click", () => {
            let productoSeleccionado = {
                id: producto.id,
                nombre: producto.nombre,
                precioUnidad: producto.precioUnidad,
                cantidad: 0,
                stock: producto.stock,
                img: producto.img,
                precioTotal: 0
            }
            if(carrito.some(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)){
                añadirProductoExistenteACarrito(productoSeleccionado)
            }else{
                añadirProductoNuevoACarrito(productoSeleccionado)
                cambiarCantidadPorBotones(carrito)
            }
        })
    })
}
function imprimirListaDeProductos(productos){
    divProductos.innerHTML = ``
    productos.forEach((producto) => {
        divProductos.innerHTML += `
        <div class="producto">
            <div class="contenedor-producto-interno" id="producto${producto.id}">
                <a href="#">
                    <div>
                        <img class="img-fluid imagen-producto" src="../images/${producto.img}">
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
    listenerAgregarACarrito(productos)
}
function busquedaDeProductos(inputBusqueda, productos){
    let resultadosDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputBusqueda.toLowerCase()))
    imprimirListaDeProductos(resultadosDeBusqueda)
    return resultadosDeBusqueda
}
export {imprimirListaDeProductos, busquedaDeProductos, actualizarTotalDeCarrito, cambiarCantidadPorBotones, eliminarProducto}