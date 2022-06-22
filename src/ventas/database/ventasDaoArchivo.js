
import { crearErrorRecursoNoEncontrado } from '../../compartido/errors/ErrorRecursoNoEncontrado.js'


const ventas = []

export async function recuperarVentas(){
    return[...ventas]
}

export async function guardarVenta(venta) {
    const indiceBuscado = ventas.findIndex(v => v.id === venta.id)
    if (indiceBuscado === -1) {
        ventas.push(venta)
    } else {
        ventas[indiceBuscado] = venta
    }
}
export async function eliminarVentas() {
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export async function recuperarVenta(id) {
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

export async function obtenerVentaSegunId(id) {
    const ventaBuscada = ventas.find(v => v.id === id)
    if (ventaBuscada) {
        return copiarVenta(ventaBuscada)
    } else {
        throw new Error('venta no encontrada')
    }
}

export async function eliminarVenta(id) {
    const idVenta = ventas.findIndex(v => v.id === id)
    if (idVenta === -1) {
        throw crearErrorRecursoNoEncontrado('venta')
    } else {
        ventas.splice(idVenta, 1)   
    }
}

export function reemplazarVenta(id, datosVenta) {
    const idVenta = ventas.findIndex(v => v.id === id)
    if (idVenta === -1) {
        throw new Error('venta no encontrada')
    } else {
            const venta = crearVenta(datosVenta)
            venta.id = id
            ventas[idVenta] = venta      
    }
}