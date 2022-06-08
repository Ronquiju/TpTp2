
import { crearErrorRecursoNoEncontrado } from '../../compartido/errors/ErrorRecursoNoEncontrado.js'


const productos = []

export function guardarProducto(producto) {
    const indiceBuscado = productos.findIndex(p => p.id === carrera.id)
    if (indiceBuscado === -1) {
        productos.push(producto)
    } else {
        productos[indiceBuscado] = producto
    }
}

export function eliminarProducto(id) {
    const indiceBuscado = productos.findIndex(p => p.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('producto')
    } else {
        productos.splice(indiceBuscado, 1)
    }
}
export function borrarProductos() {
    while (productos.length > 0) {
        productos.pop()
    }
}

export function recuperarProducto(id) {
    const buscado = productos.find(p => p.id === id)
    if (buscado) {
        return copiarProducto(buscado)
    } else {
        throw crearErrorRecursoNoEncontrado('producto')
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

export function nombreEstaDisponible(nombre) {
    return productos.every(p => p.nombre !== nombre)
}