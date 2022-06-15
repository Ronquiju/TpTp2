import { MODO_PERSISTENCIA } from '../../config/config.js'
import * as daoArchivos from './usuariosDaoArchivo.js'
import * as daoMemoria from './usuariosDaoMemoria.js'
import * as daoBDD from './usuariosDaoBDD.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    case 'BDD':
        dao = daoBDD  
        break  
    default:
        dao = daoMemoria
}

export default dao
