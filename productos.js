class Producto{
    constructor(nombre, precio, stock, imagen){
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }
}
const producto1 = new Producto("oráculo conexión con el universo box", 3990, 20, "../images/productos/cartas/universobox.jpg")
const producto2 = new Producto("oráculo conexión con el universo simple", 2650, 35, "../images/productos/cartas/universosolo.jpg")
const producto3 = new Producto("lectura de cartas 45minn", 4800, 10000, "../images/productos/tarot.jpg")
const producto4 = new Producto("kit 7 chakras personal", 2650, 12, "../images/productos/limpieza/chakras.jpg")
const producto5 = new Producto("spry energético sándalo y champa", 650, 16, "../images/productos/limpieza/sandaloychampa.jpg")
const producto6 = new Producto("spry energético de limpieza", 650, 11, "../images/productos/limpieza/limpieza.jpg")
const producto7 = new Producto("spry energético ruda y romero", 690, 19, "../images/productos/limpieza/rudayromero.jpg")
const producto8 = new Producto("spry energético abundancia y fortuna", 780, 25, "../images/productos/limpieza/abundanciayfortuna.jpg")
const producto9 = new Producto("vela de soja de abundancia", 890, 2, "../images/productos/velas/abundancia.jpg")
const producto10 = new Producto("vela de soja para el amor", 890, 22, "../images/productos/velas/amor.jpg")
const producto11 = new Producto(`vela de soja "buda"`, 950, 20, "../images/productos/velas/buda.jpg")
const producto12 = new Producto("vela de soja limpieza energética", 920, 20, "../images/productos/velas/limpieza.jpg")
const producto13 = new Producto("vela de soja para la seducción", 990, 9, "../images/productos/velas/seduccion.jpg")

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13]
const divProductos = document.getElementById("idDivProductos")
for(let producto of productos){
    divProductos.innerHTML += `
    <div class="producto">
        <div class="contenedor-producto-interno">
            <a href="#">
                <div>
                    <img class="img-fluid" src="${producto.imagen}">
                </div>
                <div class="titulo-producto">
                    <h3 style="text-transform: uppercase;">
                        ${producto.nombre}
                    </h3>
                    <h3>
                        $${producto.precio}
                    </h3>
                </div>
            </a>
        </div>
    </div>
    `
}
const inputBusqueda = document.getElementById("idInputBusqueda")
const buttonBusqueda = document.getElementById("idButtonBusqueda")
buttonBusqueda.addEventListener("change", (event) =>{
    event.preventDefault()
    funcionBusqueda(inputBusqueda.value.toLowerCase())
})
buttonBusqueda.addEventListener("click", (event) =>{
    event.preventDefault()
    funcionBusqueda(inputBusqueda.value.toLowerCase())
})
function funcionBusqueda(inputBusqueda){
    const resultadosDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputBusqueda))
    funcionMostrarHTML(resultadosDeBusqueda)
}
function funcionMostrarHTML(resultadosDeBusqueda){
    divProductos.innerHTML = ``
    for(let producto of resultadosDeBusqueda){
        divProductos.innerHTML += `
        <div class="producto">
            <div class="contenedor-producto-interno">
                <a href="#">
                    <div>
                        <img class="img-fluid" src="${producto.imagen}">
                    </div>
                    <div class="titulo-producto">
                        <h3 style="text-transform: uppercase;">
                            ${producto.nombre}
                        </h3>
                        <h3>
                            $${producto.precio}
                        </h3>
                    </div>
                </a>
            </div>
        </div>
        `
    }
}