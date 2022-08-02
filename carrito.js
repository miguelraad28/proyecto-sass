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
}