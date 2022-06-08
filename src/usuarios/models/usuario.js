import { obtenerNuevoId } from '../../compartido/id/ids.js'
import {crearErrorDeDatosFaltantes} from '../../compartido/errors/errorDatosFaltantes.js'

export function crearUsuario(datos) {
    if (!datos.nombre) {
        crearErrorDeDatosFaltantes('nombre')
    }

    if (!datos.apellido) {
        crearErrorDeDatosFaltantes('apellido')
    }
    
    if (!datos.nombreUsuario) {
        crearErrorDeDatosFaltantes('nombreUsuario')
    }
    
    if (!datos.mail) {
        crearErrorDeDatosFaltantes('mail')
    }
    const usuario = {
        id: obtenerNuevoId('usuario'),
        nombreUsuario: datos.nombreUsuario,
        apellido: datos.apellido,
        nombre: datos.nombre,
        mail: datos.mail,
        fechaNacimiento: datos.fechaNacimiento,
        domicilio: datos.domicilio,
        dni: datos.dni
    }
    return usuario
}