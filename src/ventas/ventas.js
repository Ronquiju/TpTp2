import { crearVenta } from './venta.js'

const ventas = []

export function obtenerVentas() {
    return [...ventas]
}

export function borrarVentas() {
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export function agregarVenta(datosVenta) {
    const v = crearVenta(datosVenta)
    ventas.push(v)
    return v
}


function copiarVenta(venta) { //se ahce una copia para que en el test se hagan verificaciones 
    return {...venta} //devolver el mismo objeto pero con distinta direccion de memoria
    
}

export function obtenerVentaSegunId(id) {
    const vBuscado = usuarios.find(c => c.id === id)
    if (vBuscado) {
        return copiarVenta(vBuscado)
    } else {
        throw new Error('usuario no encontrado')
    }
}

export function borrarVentaSegunId(id) {
    const idVenta= ventas.findIndex(u => u.id === id)
    if (idVenta === -1) {
        throw new Error('usuario no encontrado')
    } else {
      ventas.splice(idVenta, 1) //reemplaza el idVenta por 1
      //  ventas.pop(idVenta)
    }
}
 
export function reemplazarVenta(id, datosVenta) {
    const idVenta = ventas.findIndex(u => u.id === id)
    if (idVenta === -1) {
        throw new Error('usuario no encontrado')
    } else {
            const venta = crearVenta(datosVenta)
            venta.id = id
            ventas[idVenta] = venta      
    }
}

