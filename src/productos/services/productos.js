import { crearProducto } from '../models/producto.js'
import dao from '../database/productosDao.js'
import { crearErrorNombreUnico } from '../../compartido/errors/ErrorNombreUnico.js'

function validarNombreUnico(nombre) {
    if (!dao.nombreEstaDisponible(nombre)) throw crearErrorNombreUnico()
}

export function obtenerProductos() {
    return dao.obtenerProductos()
}

export function agregarProducto(datosProducto) {
    validarNombreUnico(datosProducto.nombre)
    const producto = crearProducto(datosProducto)
    dao.guardarProducto(producto)
    return producto
}

export function borrarProductos() {
    dao.borrarProductos()
}

export function obtenerProductoSegunId(id) {
    return dao.recuperarProducto(id)
}

export function borrarProductoSegunId(id) {
    dao.borrarProductoSegunId(id)
}

export function reemplazarProducto(id, datosProducto) {
    const producto = crearProducto(datosProducto)
    producto.id = id
    dao.reemplazarProducto(producto)
}
