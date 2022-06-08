import { obtenerNuevoId } from '../compartido/id/ids.js'
import { lanzarErrorDeValidacionDeDatos} from '../../compartido/errors/validacion.js'


export function crearProducto(datosProducto) {
    if (!datosProducto.nombre) {
        lanzarErrorDeValidacionDeDatos('nombre')
    }
    if (!datosProducto.precio) {
        lanzarErrorDeValidacionDeDatos('precio')
    }
    if (datosProducto.stock < 0) {
        lanzarErrorDeValidacionDeDatos('stock')
    }
    
    const producto = {
        id: obtenerNuevoId('producto'),
        nombre: datosProducto.nombre,
        precio: datosProducto.precio,
        stock: datosProducto.stock,
    }
    return producto
}