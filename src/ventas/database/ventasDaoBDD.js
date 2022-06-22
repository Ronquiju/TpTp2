import { crearErrorRecursoNoEncontrado } from'../../compartido/errors/errorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../compartido/errors/errorPersistencia.js'

import { database } from '../../compartido/database/mongoClient.js';

const ventas = database.collection('ventas');

export async function guardarVenta(venta) {
    try {
        await ventas.updateOne({ id: venta.id }, { $set: venta }, { upsert: true })
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function recuperarVenta(id) {
    let ventaBuscada
    try {
        ventaBuscada = await ventas.findOne({ id }, { projection: { _id: 0 } })
    } catch (error) {
        throw crearErrorDePersistencia()
    }

    if (!ventaBuscada) {
        throw crearErrorRecursoNoEncontrado('venta')
    }

    return ventaBuscada
}

export async function recuperarVentas() {
    try {
        const listaVentas = await ventas.find().project({ _id: 0 }).toArray();
        return listaVentas
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}

export async function eliminarVenta(id) {
    let venta
    try {
        venta = await ventas.deleteOne({ id })
    } catch (error) {
        throw crearErrorDePersistencia()
    }

    if (venta.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('venta')
    }
}

export async function eliminarVentas() {
    try {
        await ventas.deleteMany({})
    } catch (error) {
        throw crearErrorDePersistencia()
    }
}
