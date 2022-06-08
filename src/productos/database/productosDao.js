import { MODO_PERSISTENCIA } from '../../config/config.js'
import * as daoArchivos from './productosDaoArchivo.js'
import * as daoMemoria from './usuariosDaoMemoria.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    default:
        dao = daoMemoria
}

export default dao
