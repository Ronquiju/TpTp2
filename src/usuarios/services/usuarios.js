import { crearUsuario } from '../models/usuario.js'
import dao from '../database/usuariosDao.js'
import { crearErrorNombreUnico } from '../../compartido/errors/ErrorNombreUnico.js'

async function validarNombreUnico(nombre) {
    const disponible = await dao.nombreEstaDisponible(nombre)
    if(!disponible) throw crearErrorNombreUnico
}

export async function obtenerUsuarios() {
    return await dao.recuperarUsuarios()
}

export async function agregarUsuario(datosUsuario) {
    await validarNombreUnico(datosUsuario.nombre)
    const usuario = crearUsuario(datosUsuario)
    await dao.guardarUsuario(usuario)
    return usuario
}

export async function borrarUsuarios() {
    await dao.eliminarUsuarios()
}

export async function obtenerUsuarioSegunId(id) {
    return await dao.recuperarUsuario(id)
}

export async function borrarUsuarioSegunId(id) {
   await dao.eliminarUsuario(id)
}

export async function reemplazarUsuario(id, datosUsuario) {
    const usuario = crearUsuario(datosUsuario)
    usuario.id = id
    await dao.guardarUsuario(usuario)
}

