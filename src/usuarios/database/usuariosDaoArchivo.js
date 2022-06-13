
import { crearErrorRecursoNoEncontrado } from '../../compartido/errors/ErrorRecursoNoEncontrado.js'


const usuarios = []

export function obtenerUsuarios(){
    return[...usuarios]
}

export function guardarUsuario(usuario) {
    const indiceBuscado = usuarios.findIndex(u => u.id === usuario.id)
    if (indiceBuscado === -1) {
        usuarios.push(usuario)
    } else {
        usuarios[indiceBuscado] = usuario
    }
    
}

export function elminarUsuario(id) {
    const indiceBuscado = usuarios.findIndex(u => u.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('producto')
    } else {
        usuarios.splice(indiceBuscado, 1)
    }
}




export function borrarUsuarios() {
    while (usuarios.length > 0) {
        usuarios.pop()
    }
}

export function recuperarUsuario(id) {
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



export function obtenerUsuarioSegunId(id) {
    const usuarioBuscado = usuarios.find(u => u.id === id)
    if (usuarioBuscado) {
        return copiarUsuario(usuarioBuscado)
    } else {
        throw new Error('producto no encontrado')
    }
}

export function borrarUsuarioSegunId(id) {
    const idUsuario = usuarios.findIndex(u => u.id === id)
    if (idUsuario === -1) {
        throw new Error('usuario no encontrado')
    } else {
        usuarios.splice(idUsuario, 1)
        
    }
}

export function reemplazarUsuario(id, datosUsuario) {
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