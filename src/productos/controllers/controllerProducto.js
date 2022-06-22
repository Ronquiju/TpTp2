
import * as api from '../services/productos.js'

export async function get(req, res, next) {
    try {
        const producto = await api.obtenerProductoSegunId(req.params.id)
        res.json(producto)
    } catch (error) {
      next(error)
    }
}

export async function post(req, res, next)  {
    try {
        const producto = req.body
        const productoAgregado = await api.agregarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        next(error)
    }
}

export async function deletePorId(req, res, next)  {
    try {
        await api.borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export async function put(req, res, next)  {
    try {
        const datosAct = req.body
        const productoAct = api.reemplazarProducto(req.params.id, datosAct)
        res.json(productoAct)
    } catch (error) {
        next(error)
    }
}
