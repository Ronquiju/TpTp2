import { crearProducto } from '../models/producto.js'
import dao from '../database/productosDao.js'
import { crearErrorNombreUnico } from '../../compartido/errors/ErrorNombreUnico.js'

async function validarNombreUnico(nombre) {
    const disponible = await dao.nombreEstaDisponible(nombre)
    if(!disponible) throw crearErrorNombreUnico
}

export async function obtenerProductos() {
    return await dao.recuperarProductos()
}

export async function agregarProducto(datosProducto) {
    await validarNombreUnico(datosProducto.nombre)
    const producto = crearProducto(datosProducto)
    await dao.guardarProducto(producto)
    return producto
}

export async function borrarProductos() {
    await dao.eliminarProductos()
}

export async function obtenerProductoSegunId(id) {
    return await dao.recuperarProducto(id)
}

export async function borrarProductoSegunId(id) {
    await await dao.eliminarProducto(id)
}

export async function reemplazarProducto(id, datosProducto) {
    const producto = crearProducto(datosProducto)
    producto.id = id
    await dao.guardarProducto(producto)
}
