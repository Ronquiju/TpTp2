
import * as api from '../services/usuarios.js'


export async function get(req, res, next)  {
    try {
        const usuario = await api.obtenerUsuarioSegunId(req.params.id)
        res.json(usuario)
    } catch (error) {
        next(error)
    }
}

export async function post(req, res, next) {
    try {
        const usuario = req.body
        const usuarioAgregado = await api.agregarUsuario(usuario)
        res.status(201).json(usuarioAgregado)
    } catch (error) {
        next(error)
    }
}

export async function deletePorId(req, res, next)  {
    try {
        await api.borrarUsuarioSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export async function put(req, res, next)  {
    try {
        const datosActualizados = req.body
        const usuarioActualizado = await api.reemplazarUsuario(req.params.id, datosActualizados)
        res.json(usuarioActualizado)
    } catch (error) {
       next(error)
    }
}

