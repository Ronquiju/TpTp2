
import { crearErrorRecursoNoEncontrado } from'../../compartido/errors/errorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../compartido/errors/errorPersistencia.js'

import { database } from '../../compartido/database/mongoClient.js';

const usuarios = database.collection('usuarios');

export async function guardarUsuario(usuario) {
    try {
        await usuarios.updateOne({ id: usuario.id }, { $set: usuario }, { upsert: true })
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function recuperarUsuario(id) {
    let usuarioBuscado
    try {
        usuarioBuscado = await usuarios.findOne({ id }, { projection: { _id: 0 } })
    } catch (error) {
        throw crearErrorDePersistencia()
    }

    if (!usuarioBuscado) {
        throw crearErrorRecursoNoEncontrado('usuario')
    }

    return usuarioBuscado
}

export async function recuperarUsuarios() {
    try {
        const listaUsuarios = await usuarios.find().project({ _id: 0 }).toArray();
        return listaUsuarios
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function eliminarUsuario(id) {
    let usuario
    try {
        usuario = await usuarios.deleteOne({ id })
    } catch (error) {
        throw crearErrorDePersistencia()
    }

    if (usuario.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('usuario')
    }
}

export async function eliminarUsuarios() {
    try {
        await usuarios.deleteMany({})
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function nombreEstaDisponible(nombre) {
    try {
        const result = await usuarios.findOne({ nombre });
        return !result
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}