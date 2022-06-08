import { obtenerNuevoId } from '../../compartido/id/ids.js'
import {crearErrorDeDatosFaltantes} from '../../compartido/errors/errorDatosFaltantes.js'


export function crearVenta(datos) {
    if (!datos.id) {
        crearErrorDeDatosFaltantes('id')
    }

    if (!datos.fechaCompra) {
        crearErrorDeDatosFaltantes('fechaCompra')
    }
    
    if (!datos.precioTotal) {
        crearErrorDeDatosFaltantes('precioTotal')
    }
    
    if (!datos.usuario.domicilioEnvio) {
        crearErrorDeDatosFaltantes('domicilioEnvio')
    }

    if (!datos.productos) {
        crearErrorDeDatosFaltantes('productos')
    }
    if (!datos.usuario) {
        crearErrorDeDatosFaltantes('comprador')
    }


    const venta = {
        id: obtenerNuevoId('venta'),
        fechaCompra: datos.fechaCompra,
        precioTotal: datos.precioTotal,
        domicilioEnvio: datos.usuario.domicilioEnvio,
        productos: datos.productos,
        usuario: datos.usuario,
    }
    return venta
}