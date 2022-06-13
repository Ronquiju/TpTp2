import { crearVenta } from '../models/venta.js'
import dao from '../database/ventasDao.js'

export function obtenerVentas() {
    return dao.obtenerVentas()
}

export function agregarVenta(datosVenta) {

    const venta = crearVenta(datosVenta)
    dao.guardarVenta(venta)
    return venta
}

export function borrarVentas() {
    dao.borrarVentas()
}

export function obtenerVentaSegunId(id) {
    return dao.recuperarVenta(id)
}

export function borrarVentaSegunId(id) {
    dao.borrarVentaSegunId(id)
}

export function reemplazarVenta(id, datosVenta) {
    const venta = crearVenta(datosVenta)
    venta.id = id
    dao.guardarVenta(venta)
}


