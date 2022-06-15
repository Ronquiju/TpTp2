
import { crearErrorRecursoNoEncontrado } from '../../compartido/errors/ErrorRecursoNoEncontrado.js'


const usuarios = []

export async function obtenerUsuarios(){
    return[...usuarios]
}

export async function guardarUsuario(usuario) {
    const indiceBuscado = usuarios.findIndex(u => u.id === usuario.id)
    if (indiceBuscado === -1) {
        usuarios.push(usuario)
    } else {
        usuarios[indiceBuscado] = usuario
    }
    
}

export async function elminarUsuario(id) {
    const indiceBuscado = usuarios.findIndex(u => u.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('usuario')
    } else {
        usuarios.splice(indiceBuscado, 1)
    }
}




export async function borrarUsuarios() {
    while (usuarios.length > 0) {
        usuarios.pop()
    }
}

export async function recuperarUsuario(id) {
     const buscado = usuarios.find(u => u.id === id)
     
    if (buscado) {
        return buscado
    } else {
        throw crearErrorRecursoNoEncontrado('usuario')
    }
    
}

function copiarUsuario(usuario) {
    return {...usuario}
    
}



export async function obtenerUsuarioSegunId(id) {
    const usuarioBuscado = usuarios.find(u => u.id === id)
    if (usuarioBuscado) {
        return copiarUsuario(usuarioBuscado)
    } else {
        throw new Error('usuario no encontrado')
    }
}

export async function borrarUsuarioSegunId(id) {
    const idUsuario = usuarios.findIndex(u => u.id === id)
    if (idUsuario === -1) {
        throw new Error('usuario no encontrado')
    } else {
        usuarios.splice(idUsuario, 1)
        
    }
}

export async function reemplazarUsuario(id, datosUsuario) {
    const idUsuario = usuarios.findIndex(u => u.id === id.id)
    if (idUsuario === -1) {
        throw new Error('usuario no encontrado')
    } else {
            const usuario = crearUsuario(datosUsuario)
            usuario.id = id
            usuarios[idUsuario] = usuario      
    }
}

export function nombreEstaDisponible(nombre) {
    return usuarios.every(u => u.nombre !== nombre)
}