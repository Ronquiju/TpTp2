import { crearVenta } from '../models/venta.js'
import dao from '../database/ventasDao.js'

export async function obtenerVentas() {
    return await dao.obtenerVentas()
}

export async function agregarVenta(datosVenta) {

    const venta = crearVenta(datosVenta)
    await dao.guardarVenta(venta)
    return venta
}

export async function borrarVentas() {
    await dao.borrarVentas()
}

export async function obtenerVentaSegunId(id) {
    return await dao.recuperarVenta(id)
}

export async function borrarVentaSegunId(id) {
    await dao.borrarVentaSegunId(id)
}

export async function reemplazarVenta(id, datosVenta) {
    const venta = crearVenta(datosVenta)
    venta.id = id
    await dao.guardarVenta(venta)
}


