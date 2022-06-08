import { Router } from 'express'

import * as api from '../services/usuarios.js'

import { prepararRespuestaConError } from '../../compartido/errors/respuestaConError.js'

const routerUsuarios = new Router()

routerUsuarios.get('/:id', (req, res, next) => {
    try {
        const usuario = api.obtenerUsuarioSegunId(req.params.id)
        res.json(usuario)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerUsuarios.post('/', (req, res, next) => {
    try {
        const usuario = req.body
        const usuarioAgregado = api.agregarUsuario(usuario)
        res.status(201).json(usuarioAgregado)
    } catch (error) {
        if (error.tipo === 'NOMBRE_UNICO') {
            res.status(409).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

routerUsuarios.delete('/:id', (req, res, next) => {
    try {
        api.borrarUsuarioSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerUsuarios.put('/:id', (req, res, next) => {
    try {
        const datosActualizados = req.body
        const usuarioActualizado = api.reemplazarUsuario(req.params.id, datosActualizados)
        res.json(usuarioActualizado)
    } catch (error) {
        if (error.tipo === 'NO_ENCONTRADO') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export { routerUsuarios }