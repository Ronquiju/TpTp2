import express from 'express'
import { routerUsuarios } from '../usuarios/routerUsuarios.js'
import { routerVentas } from '../ventas/routerVentas.js'
import { routerProductos } from '../productos/routerProductos.js'


const app = express()

app.use(express.json())

app.use('/api/usuarios', routerUsuarios)
app.use('/api/ventas', routerVentas)
app.use('/api/productos', routerProductos)


let server

export function conectar(port = 0) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve(server.address().port)
        })
        server.on('error', error => {
            reject(error)
        })
    })
}

export function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}
