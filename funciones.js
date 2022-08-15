import {carrito, divCarritoDeCompras} from "./carrito.js"
const divProductos = document.getElementById("idDivProductos")
function actualizarCantidadPorInput(carrito){
    carrito.forEach((productoEnCarrito) =>{
        const inputCantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1]
        inputCantidadAComprar.addEventListener("change", () => {
            if(inputCantidadAComprar.value < 1){
                inputCantidadAComprar.value = 1
                productoEnCarrito.cantidad = inputCantidadAComprar.value
            }else{
                productoEnCarrito.cantidad = inputCantidadAComprar.value
                productoEnCarrito.precioTotal = productoEnCarrito.precioUnidad * productoEnCarrito.cantidad
                const divPrecioTotal = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[0]
                divPrecioTotal.textContent = `$${productoEnCarrito.precioTotal}`
                localStorage.setItem("carrito", JSON.stringify(carrito))
                actualizarTotalAPagar(carrito)
            }
        })
    })
}
function actualizarProductoEnCarrito(producto){
    producto.cantidad += 1
    producto.precioTotal = producto.precioUnidad * producto.cantidad
}
function actualizarPrecioYCantidad(carrito){
    carrito.forEach((productoEnCarrito) => {
        const inputCantidadAComprar = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[1]
        inputCantidadAComprar.value = productoEnCarrito.cantidad
        const divPrecioTotal = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).children[1].children[1].children[0]
        divPrecioTotal.textContent = `$${productoEnCarrito.precioTotal}`
    })
}
function actualizarTotalAPagar(carrito){
    let acumulador = 0
    const totalAPagarPorProducto = (carrito.map(productoEnCarrito => productoEnCarrito.precioTotal))
    totalAPagarPorProducto.forEach((totalPorProducto) => {
        acumulador += totalPorProducto
    })
    const totalAPagar = document.getElementById(`idTotalAPagar`)
    totalAPagar.innerHTML = `: <b>$${acumulador}</b>`
}
function añadirProductoExistenteACarrito(productoSeleccionado){
    let productoExistente = carrito.find(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)
    actualizarProductoEnCarrito(productoExistente)
    actualizarPrecioYCantidad(carrito)
    actualizarTotalAPagar(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
function añadirProductoNuevoACarrito(productoSeleccionado){
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
function eliminarProducto(carrito){
    carrito.forEach((productoEnCarrito) => {
        const botonEliminarProductoDeCarrito = document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).lastElementChild.lastElementChild
        botonEliminarProductoDeCarrito.addEventListener("click", () => {
            document.getElementById(`productoEnCarrito${productoEnCarrito.id}`).remove()
            carrito.splice(carrito.indexOf(productoEnCarrito), 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            actualizarTotalAPagar(carrito)
        })
    })
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
                img: producto.img,
                precioTotal: 0
            }
            if(carrito.some(productoEnCarrito => productoEnCarrito.id === productoSeleccionado.id)){
                añadirProductoExistenteACarrito(productoSeleccionado)
            }else{
                añadirProductoNuevoACarrito(productoSeleccionado)
            }
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
    actualizarCantidadPorInput(carrito)
    eliminarProducto(carrito)
}
function busquedaDeProductos(inputBusqueda, productos){
    let resultadosDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputBusqueda.toLowerCase()))
    imprimirListaDeProductos(resultadosDeBusqueda)
    return resultadosDeBusqueda
}
export {imprimirListaDeProductos, busquedaDeProductos, actualizarTotalAPagar, actualizarCantidadPorInput, eliminarProducto}