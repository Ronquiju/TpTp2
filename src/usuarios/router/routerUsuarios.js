import { Router } from 'express'

import * as api from '../services/usuarios.js'

import { respuestaConError } from '../../compartido/errors/validacion.js'

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
        const { codigo, mensaje } = respuestaConError(error)
        res.status(codigo).json({ mensaje })
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
        const datosAct = req.body
        const usuarioAct = api.reemplazarUsuario(req.params.id, datosAct)
        res.json(usuarioAct)
    } catch (error) {
        if (error.tipo == 'not_found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export { routerUsuarios }