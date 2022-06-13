import { crearUsuario } from '../models/usuario.js'
import dao from '../database/usuariosDao.js'
import { crearErrorNombreUnico } from '../../compartido/errors/ErrorNombreUnico.js'

function validarNombreUnico(nombre) {
    if (!dao.nombreEstaDisponible(nombre)) throw crearErrorNombreUnico()
}

export function obtenerUsuarios() {
    return dao.obtenerUsuarios()
}

export function agregarUsuario(datosUsuario) {
    validarNombreUnico(datosUsuario.nombre)
    const usuario = crearUsuario(datosUsuario)
    dao.guardarUsuario(usuario)
    return usuario
}

export function borrarUsuarios() {
    dao.borrarUsuarios()
}

export function obtenerUsuarioSegunId(id) {
    return dao.recuperarUsuario(id)
}

export function borrarUsuarioSegunId(id) {
    dao.borrarUsuarioSegunId(id)
}

export function reemplazarUsuario(id, datosUsuario) {
    const usuario = crearUsuario(datosUsuario)
    usuario.id = id
    dao.guardarUsuario(usuario)
}

