import * as api from '../services/ventas.js'

export async function get(req, res, next)  {
    try {
        const v = await api.obtenerVentaSegunId(req.params.id)
        res.json(v)
    } catch (error) {
        next(error)
    }
}

export async function post(req, res, next) {
    try {
        const v = req.body
        const vAgregada = await api.agregarVenta(v)
        res.status(201).json(vAgregada)
    } catch (error) {
        next(error)
    }
}

export async function deletePorId(req, res, next) {
    try {
        await api.borrarVentaSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)

        
    }
}

export async function put(req, res, next)  { 
    try {
        const datosAct = req.body
        const ventaAct = await api.reemplazarVenta(req.params.id, datosAct)
        res.json(ventaAct)
    } catch (error) {
        next(error)
    }
}


