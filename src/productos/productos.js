import { crearProducto } from './producto.js'

const productos = []

export function obtenerProductos() {
    return [...productos]
}


export function agregarProducto(datosProducto) {
    const producto = crearProducto(datosProducto)
    productos.push(producto)
    return producto
}

export function borrarProductos() {
    while (productos.length > 0) {
        productos.pop()
    }
}

function copiarProducto(producto) {
    return {...producto}
    
}

export function obtenerProductoSegunId(id) {
    const productoBuscado = productos.find(p => p.id === id)
    if (productoBuscado) {
        return copiarProducto(productoBuscado)
    } else {
        throw new Error('producto no encontrado')
    }
}

export function borrarProductoSegunId(id) {
    const idProducto = productos.findIndex(p => p.id === id)
    if (idProducto === -1) {
        throw new Error('producto no encontrado')
    } else {
        productos.splice(idProducto, 1)
        
    }
}

export function reemplazarProducto(id, datosProducto) {
    const idProducto = productos.findIndex(p => p.id === id)
    if (idProducto === -1) {
        throw new Error('productos no encontrado')
    } else {
            const producto = crearProducto(datosProducto)
            producto.id = id
            productos[idProducto] = producto      
    }
}