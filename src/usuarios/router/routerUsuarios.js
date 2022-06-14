import { Router } from 'express'
import * as controllersUsuarios from '../controllers/controllerUsuario.js'

const routerUsuarios = new Router()

routerUsuarios.get('/:id', controllersUsuarios.get)
routerUsuarios.post('/', controllersUsuarios.post)
routerUsuarios.delete('/:id', controllersUsuarios.deletePorId)
routerUsuarios.put('/:id', controllersUsuarios.put)

export default routerUsuarios