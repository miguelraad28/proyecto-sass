import {actualizarTotalAPagar, eliminarProducto} from "./funciones.js"
let carrito = []
const divCarritoDeCompras = document.getElementById("idDivCarritoDeCompras")
function cargarCarritoLocal(){
    let HTMLActual = window.location.pathname
    if(HTMLActual == "/index.html"){
        innerCarritoRoot()
    }else{
        innerCarritoPages
    }
}
function innerCarritoPages(){
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        carrito.forEach(productoEnCarrito => {
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
        })
        actualizarTotalAPagar(carrito)
        eliminarProducto(carrito)
    }
}
function innerCarritoRoot(){
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        carrito.forEach(productoEnCarrito => {
            divCarritoDeCompras.innerHTML += `
            <div class="productoEnCarrito" id="productoEnCarrito${productoEnCarrito.id}">
                <div class="imagenProductoEnCarrito">
                    <img src="images/${productoEnCarrito.img}">
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
        actualizarTotalAPagar(carrito)
        eliminarProducto(carrito)
    }
}
cargarCarritoLocal()
export {carrito, divCarritoDeCompras};