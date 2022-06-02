import { obtenerNuevoId } from '../compartido/ids.js'
import {lanzarErrorDeValidacionDeDatos} from '../compartido/validacion.js'


export function crearVenta(datos) {
    if (!datos.id) {
        lanzarErrorDeValidacionDeDatos('id')
    }

    if (!datos.fechaCompra) {
        lanzarErrorDeValidacionDeDatos('fechaCompra')
    }
    
    if (!datos.precioTotal) {
        lanzarErrorDeValidacionDeDatos('precioTotal')
    }
    
    if (!datos.usuario.domicilioEnvio) {
        lanzarErrorDeValidacionDeDatos('domicilioEnvio')
    }

    if (!datos.productos) {
        lanzarErrorDeValidacionDeDatos('productos')
    }
    if (!datos.usuario) {
        lanzarErrorDeValidacionDeDatos('comprador')
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