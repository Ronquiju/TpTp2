import { Router } from 'express'
import {
    agregarVenta,
    obtenerVentaSegunId,
    borrarVentaSegunId,
    reemplazarVenta
} from './ventas.js'
import { respuestaConError } from '../compartido/validacion.js'

const routerVentas = new Router()


routerVentas.get('/:id', (req, res) => {
    try {
        const v = obtenerVentaSegunId(req.params.id)
        res.json(v)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerVentas.post('/', (req, res) => {
    try {
        const v = req.body
        const vAgregada = agregarVenta(v)
        res.status(201).json(vAgregada)
    } catch (error) {
        const { codigo, mensaje } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
})

routerVentas.delete('/:id', (req, res) => {
    try {
        borrarVentaSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerVentas.put('/:id', (req, res) => { //reemplaza, update la venta
    try {
        const datosAct = req.body
        const ventaAct = reemplazarVenta(req.params.id, datosAct)
        res.json(ventaAct)
    } catch (error) {
        if (error.tipo == 'not_found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})



export { routerVentas }