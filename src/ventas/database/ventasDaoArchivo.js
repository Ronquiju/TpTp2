
import { crearErrorRecursoNoEncontrado } from '../../compartido/errors/ErrorRecursoNoEncontrado.js'


const ventas = []

export function guardarVenta(venta) {
    const indiceBuscado = ventas.findIndex(v => v.id === venta.id)
    if (indiceBuscado === -1) {
        ventas.push(venta)
    } else {
        ventas[indiceBuscado] = venta
    }
}

export function eliminarVenta(id) {
    const indiceBuscado = ventas.findIndex(v => v.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('venta')
    } else {
        ventas.splice(indiceBuscado, 1)
    }
}




export function borrarVentas() {
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export function recuperarVenta(id) {
    const buscada = ventas.find(v => v.id === id)
    if (buscada) {
        return copiarVenta(buscada)
    } else {
        throw crearErrorRecursoNoEncontrado('venta')
    }
}

function copiarVenta(venta) {
    return {...venta}
    
}



export function obtenerVentaSegunId(id) {
    const ventaBuscada = ventas.find(v => v.id === id)
    if (ventaBuscada) {
        return copiarVenta(ventaBuscada)
    } else {
        throw new Error('venta no encontrado')
    }
}

export function borrarVentaSegunId(id) {
    const idVenta = ventas.findIndex(v => v.id === id)
    if (idVenta === -1) {
        throw new Error('venta no encontrado')
    } else {
        ventas.splice(idVenta, 1)
        
    }
}

export function reemplazarVenta(id, datosVenta) {
    const idVenta = ventas.findIndex(v => v.id === id)
    if (idVenta === -1) {
        throw new Error('venta no encontrado')
    } else {
            const venta = crearVenta(datosVenta)
            venta.id = id
            ventas[idVenta] = venta      
    }
}