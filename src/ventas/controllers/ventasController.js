import * as api from '../services/ventas.js'
import { respuestaConError } from '../../compartido/errors/validacion.js'

export async function get(req, res)  {
    try {
        const v = await api.obtenerVentaSegunId(req.params.id)
        res.json(v)
    } catch (error) {
        const { mensaje, codigo } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
}

export async function post(req, res) {
    try {
        const v = req.body
        const vAgregada = await api.agregarVenta(v)
        res.status(201).json(vAgregada)
    } catch (error) {
        const { codigo, mensaje } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
}

export async function deletePorId(req, res, next) {
    try {
        await api.borrarVentaSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function put(req, res, next)  { 
    try {
        const datosAct = req.body
        const ventaAct = await api.reemplazarVenta(req.params.id, datosAct)
        res.json(ventaAct)
    } catch (error) {
        if (error.tipo == 'not_found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}


