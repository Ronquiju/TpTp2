import { Router } from 'express'
import * as controllersVenta from '../controllers/ventasController.js'

const routerVentas = new Router()

routerVentas.get('/:id', controllersVenta.get)
routerVentas.post('/', controllersVenta.post)
routerVentas.delete('/:id', controllersVenta.deletePorId)
routerVentas.put('/:id', controllersVenta.put)

export default routerVentas
