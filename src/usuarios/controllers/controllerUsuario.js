

import * as api from '../services/usuarios.js'

import { prepararRespuestaConError } from '../../compartido/errors/respuestaConError.js'

export async function get(req, res, next)  {
    try {
        const usuario = await api.obtenerUsuarioSegunId(req.params.id)
        res.json(usuario)
    } catch (error) {
        const { mensaje, codigo } = prepararRespuestaConError(error)
        res.status(codigo).json({ mensaje })
    }
}

export async function post(req, res, next) {
    try {
        const usuario = req.body
        const usuarioAgregado = await api.agregarUsuario(usuario)
        res.status(201).json(usuarioAgregado)
    } catch (error) {
        if (error.tipo === 'NOMBRE_UNICO') {
            res.status(409).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}

export async function deletePorId(req, res, next)  {
    try {
        await api.borrarUsuarioSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function put(req, res, next)  {
    try {
        const datosActualizados = req.body
        const usuarioActualizado = await api.reemplazarUsuario(req.params.id, datosActualizados)
        res.json(usuarioActualizado)
    } catch (error) {
        if (error.tipo === 'NO_ENCONTRADO') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}

