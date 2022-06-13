import { obtenerNuevoId } from '../../compartido/id/ids.js'
import {crearErrorDeDatosFaltantes} from '../../compartido/errors/errorDatosFaltantes.js'


export function crearProducto(datosProducto) {
    if (!datosProducto.nombre) {
       throw crearErrorDeDatosFaltantes('nombre')
    }
    if (!datosProducto.precio) {
       throw crearErrorDeDatosFaltantes('precio')
    }
    if (datosProducto.stock < 0) {
       throw crearErrorDeDatosFaltantes('stock')
    }
        const producto = {
            id: obtenerNuevoId("producto"),
            nombre: datosProducto.nombre,
            precio: datosProducto.precio,
            stock: datosProducto.stock,
        }
        return producto 
    }
    
    
