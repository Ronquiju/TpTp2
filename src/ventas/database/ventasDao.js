import { MODO_PERSISTENCIA } from '../../compartido/config/config.js'
import * as daoArchivos from './ventasDaoArchivo.js'
import * as daoMemoria from './ventasDaoMemoria.js'
import * as daoBDD from './ventasDaoBDD.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    case 'BDD':
        dao =daoBDD
        break        
    default:
        dao = daoMemoria
}

export default dao
