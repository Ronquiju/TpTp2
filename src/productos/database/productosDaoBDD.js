import { crearErrorRecursoNoEncontrado } from'../../compartido/errors/errorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../compartido/errors/errorPersistencia.js'

import { database } from '../../compartido/database/mongoClient.js';

const productos = database.collection('productos');

export async function guardarProducto(producto) {
    try {
        await productos.updateOne({ id: producto.id }, { $set: producto }, { upsert: true })
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function recuperarProducto(id) {
    let productoBuscado
    try {
        productoBuscado = await productos.findOne({ id }, { projection: { _id: 0 } })
    } catch (error) {
        throw crearErrorDePersistencia()
    }
    productoBuscado
    if (!productoBuscado) {
        throw crearErrorRecursoNoEncontrado('producto')
    }

    return productoBuscado
}

export async function recuperarProductos() {
    try {
        const listaProductos = await productos.find().project({ _id: 0 }).toArray();
        return listaProductos
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function eliminarProducto(id) {
    let producto
    try {
        producto = await productos.deleteOne({ id })
    } catch (error) {
        throw crearErrorDePersistencia()
    }

    if (producto.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('producto')
    }
}

export async function eliminarProductos() {
    try {
        await productos.deleteMany({})
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function nombreEstaDisponible(nombre) {
    try {
        const result = await productos.findOne({ nombre });
        return !result
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}