import {actualizarTotalAPagar, eliminarProducto} from "./funciones.js"
let carrito = []
const divCarritoDeCompras = document.getElementById("idDivCarritoDeCompras")
// Estas funciones están realizadas con el fin de ver el carrito y sus imagenes correctamente en todos los html, si estas en la carpeta pages, la ruta de las imagenes seria yendo para atrás ../ y entrando a /images. Debido a eso, creé otra función para si estas en index.html (carpeta root), para acceder a las imágenes no salga de ninguna carpeta, es decir, entre directamente a images/productos/... y no ../images/productos...
function innerCarritoPages(){
    console.log("pages")
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
                        <h6>$${productoEnCarrito.precioTotal}</h6>
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
    console.log("root")
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
                        <h6>$${productoEnCarrito.precioTotal}</h6>
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
function cargarCarritoLocal(){
    let HTMLActual = window.location.pathname
    HTMLActual == "/proyecto-sass" ? innerCarritoRoot() : innerCarritoPages();
}
cargarCarritoLocal()
export {carrito, divCarritoDeCompras};