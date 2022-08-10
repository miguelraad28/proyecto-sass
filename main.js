import {imprimirListaDeProductos, busquedaDeProductos} from "./funciones.js";
let productos = []
fetch("../api.json")
.then(response => response.json())
.then(data => {
    productos = data
    imprimirListaDeProductos(productos)
    return productos
})
const inputBusqueda = document.getElementById("idInputBusqueda")
const botonBusqueda = document.getElementById("idBotonBusqueda")
botonBusqueda.addEventListener("change", (event) =>{
    event.preventDefault()
    busquedaDeProductos(inputBusqueda.value, productos)
})
botonBusqueda.addEventListener("click", (event) =>{
    event.preventDefault()
    busquedaDeProductos(inputBusqueda.value, productos)
})