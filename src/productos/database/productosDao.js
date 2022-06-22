import { MODO_PERSISTENCIA } from '../../compartido/config/config.js'
import * as daoArchivos from './productosDaoArchivo.js'
import * as daoMemoria from './productosDaoMemoria.js'
import * as daoBDD from './productosDaoBDD.js'


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
