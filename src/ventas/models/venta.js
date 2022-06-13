import { obtenerNuevoId } from '../../compartido/id/ids.js'
import {crearErrorDeDatosFaltantes} from '../../compartido/errors/errorDatosFaltantes.js'


export function crearVenta(datos) {
    if (!datos.fechaCompra) {
       throw crearErrorDeDatosFaltantes('fechaCompra')
    }
    
    if (!datos.precioTotal) {
      throw  crearErrorDeDatosFaltantes('precioTotal')
    }
   if (!datos.productos) {
       throw crearErrorDeDatosFaltantes('productos')
    }
    if (!datos.usuario) {
      throw  crearErrorDeDatosFaltantes('comprador')
    }


    const venta = {
        id: obtenerNuevoId('venta'),
        fechaCompra: datos.fechaCompra,
        precioTotal: datos.precioTotal,
        productos: datos.productos,
        usuario: datos.usuario,
    }
    return venta
}