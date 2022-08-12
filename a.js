let productos = []
fetch('../json/productos.json')
.then(respuesta => respuesta.json())
.then(data =>{
    productos = data 
    productos.forEach((remeras, indice) =>{
        divVacio.innerHTML += `
        <div class="card border-dark mb-3 col-md-4 mx-5 my-5" id="remeras${indice}" style="max-width: 20rem; ">
            <img src="${remeras.imagen}" class="card-img-top imagenRemeras" alt="..."> 
            <div class="card-header"><h2>${remeras.precio}</h2></div>
            <div class="card-body">
                <h4 class="card-title">${remeras.marca}</h4>
                <p class="card-title"> talle: ${remeras.talle}</p>
                <button class="btn btn-dark">Agregar al carrito</button>
            </div>
        </div>
        `
    })
    return productos
})
.then(productos => {
    productos.forEach((remera, indice) =>{
        let cardButton = document.getElementById(`remeras${indice}`).lastElementChild.children[2]
        cardButton.addEventListener('click', () => {
            remeraAgregada = {
                cantidad: 0,
                id: remera.id,
                marca: remera.marca,
                talle: remera.talle,
                precio: remera.precio,
                imagen: remera.imagen,
            }
            if(carrito.some(remeraCarrito => remeraCarrito.id === remeraAgregada.id)){
                remeraCarrito = carrito.find(remeraCarrito => remeraCarrito.id === remeraAgregada.id)
                remeraCarrito.cantidad += 1
            }else{
                remeraAgregada.cantidad += 1
                remeraCarrito = remeraAgregada
                carrito.push(remeraCarrito);
            }
            console.log(carrito)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            Toastify({
                text: "Producto agregado al carrito",
                duration: 1000,
                //destination: "https://github.com/apvarun/toastify-js",
                //newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, red, orange, yellow)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
        
    })
})