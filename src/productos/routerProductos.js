import { Router } from 'express'
import {
    agregarProducto,
    obtenerProductoSegunId,
    borrarProductoSegunId,
    reemplazarProducto
} from './productos.js'
import { respuestaConError } from '../compartido/validacion.js'

const routerProductos = new Router()

routerProductos.get('/:id', (req, res) => {
    try {
        const producto = obtenerProductoSegunId(req.params.id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerProductos.post('/', (req, res) => {
    try {
        const producto = req.body
        const productoAgregado = agregarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        const { codigo, mensaje } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
})

routerProductos.delete('/:id', (req, res) => {
    try {
        borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerProductos.put('/:id', (req, res) => {
    try {
        const datosAct = req.body
        const productoAct = reemplazarProducto(req.params.id, datosAct)
        res.json(productoAct)
    } catch (error) {
        if (error.tipo == 'not_found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})



export { routerProductos }