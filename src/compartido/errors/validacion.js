export function mensajeDeErrorDeValidacion(campo) {
    return `error en la validacion del campo '${campo}'`
}

export function respuestaConError(error) {
    const httpError = {}
    switch (error.tipo) {
        case 'DATA_VALIDATION':
            httpError.mensaje = mensajeDeErrorDeValidacion(error.campo)
            httpError.codigo = 400
            break
        case 'NO_ENCONTRADO':
            httpError.mensaje = error.message
            httpError.codigo = 404
            break
        default:
            httpError.mensaje = 'error interno'
            httpError.codigo = 500
    }
    return httpError
}

export function lanzarErrorDeValidacionDeDatos(campo) {
    const error = new Error('error de validacion de datos')
    error.tipo = 'DATA_VALIDATION'
    error.campo = campo
    throw error
}