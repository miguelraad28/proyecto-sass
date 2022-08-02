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