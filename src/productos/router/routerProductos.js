import { Router } from 'express'
import * as controllersProducto from '../controllers/controllerProducto.js'

const routerProductos = new Router()

routerProductos.get('/:id', controllersProducto.get)
routerProductos.post('/', controllersProducto.post)
routerProductos.delete('/:id', controllersProducto.deletePorId)
routerProductos.put('/:id', controllersProducto.put)

export default routerProductos

