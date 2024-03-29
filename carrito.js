import {actualizarTotalDeCarrito, cambiarCantidadPorBotones, eliminarProducto} from "./funciones.js"
let carrito = []
const divCarritoDeCompras = document.getElementById("idDivCarritoDeCompras")
const botonFinalizarCompra = document.getElementById("divBotonFinalizarCompra")
// Estas funciones están realizadas con el fin de ver el carrito y sus imagenes correctamente en todos los html, si estas en la carpeta pages, la ruta de las imagenes seria yendo para atrás ../ y entrando a /images. Debido a eso, creé otra función para si estas en index.html (carpeta root), para acceder a las imágenes no salga de ninguna carpeta, es decir, entre directamente a images/productos/... y no ../images/productos...
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
                    <h6>$${productoEnCarrito.precioTotal}</h6>
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
        })
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
                    <h6>$${productoEnCarrito.precioTotal}</h6>
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
        })
    }
}
function cargarCarritoLocal(){
    let HTMLActual = window.location.pathname;
    HTMLActual === "/proyecto-sass/" ? innerCarritoRoot() : innerCarritoPages();
    cambiarCantidadPorBotones(carrito)
    actualizarTotalDeCarrito(carrito)
    eliminarProducto(carrito)
}
cargarCarritoLocal()
botonFinalizarCompra.addEventListener("click", () => {
    if(carrito.length <= 0){
        Swal.fire({
            title: 'El carrito está vacío',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: `Añadir productos`,
            cancelButtonColor: '#FF8AF1',
        })
    }else{
        Swal.fire({
            icon: 'info',
            title: '¿Estás listo para que te lleguen tus productos?',
            showDenyButton: true,
            confirmButtonText: 'Finalizar compra',
            denyButtonText: `Seguir comprando`,
            confirmButtonColor: "#EA46C2",
            denyButtonColor: '#FF8AF1',
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Compra finalizada!', 'La factura será enviada al email, gracias por tu compra!', 'success')
                carrito = []
                localStorage.setItem("carrito", JSON.stringify(carrito))
                divCarritoDeCompras.innerHTML = ""
                actualizarTotalDeCarrito(carrito)
            }
        })
    }
})
export {carrito, divCarritoDeCompras};