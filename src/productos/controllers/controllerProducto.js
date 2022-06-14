
import * as api from '../services/productos.js'

import { respuestaConError } from '../../compartido/errors/validacion.js'

export async function get(req, res, next) {
    try {
        const producto = await api.obtenerProductoSegunId(req.params.id)
        res.json(producto)
    } catch (error) {
        const { mensaje, codigo } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
}

export async function post(req, res, next)  {
    try {
        const producto = req.body
        const productoAgregado = await api.agregarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        const { codigo, mensaje } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
}

export async function deletePorId(req, res, next)  {
    try {
        await api.borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function put(req, res, next)  {
    try {
        const datosAct = req.body
        const productoAct = api.reemplazarProducto(req.params.id, datosAct)
        res.json(productoAct)
    } catch (error) {
        if (error.tipo == 'not_found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}
