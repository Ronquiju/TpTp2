import assert from 'assert'
import axios from 'axios'
import { conectar, desconectar } from '../src/servidor/servidor.js'

import {
    obtenerUsuarios,
    agregarUsuario,
    borrarUsuarios, obtenerUsuarioSegunId
} from '../src/usuarios/services/usuarios.js'

import {
    obtenerVentas,
    agregarVenta,
    borrarVentas
} from '../src/ventas/services/ventas.js'

import { obtenerProductos,
    agregarProducto,
    borrarProductos, obtenerProductoSegunId } from '../src/productos/services/productos.js'


    const venta1 = {
        fechaCompra:"14/03/1999",
        precioTotal: 1478,
        productos:['cafetera', 'licuadora'],
        usuario: { nombre:"Juan", domicilio:"Rivadavia12" }  
    }
    const venta2 = {
        fechaCompra:"04/07/2022",
        precioTotal: 7848,
        productos:['aspiradora', 'tostadora'],
        usuario: { nombre:"Maria", domicilio:"Alberti23"}  
    }
    
const usuario1 = {
    nombreUsuario:"pabloDominguez",
    apellido:"Dominguez",
    nombre:"Pablo",
    mail:"pablo@gmail.com",
    fechaNacimiento:"14/03/1999",
    domicilio:"Rivadavia21",
    dni:"1234567"
}

const usuario2 = {
    nombre:"Juan",
    apellido:"Dominguez",
    nombreUsuario:"juanDominguez",
    dni:"123456789",
    mail:"juan@gmail.com",
    domicilio:"Rivadavia12",
    fechaNacimiento:"22/12/2000"
}

const producto1 = {
    nombre: "Heladera Samsung",
    precio: "125000",
    stock: "25"
}



describe('servidor pruebas', () => {
    let urlUsuarios
    let urlVentas
    let urlProductos

    before (async () => {
        const puerto =  await conectar()
        urlUsuarios = `http://localhost:${puerto}/api/usuarios`
        urlVentas = `http://localhost:${puerto}/api/ventas`
        urlProductos = `http://localhost:${puerto}/api/productos`
    })
    after(async () => {
        await desconectar()
    })
    beforeEach(() => {
        borrarUsuarios()
        borrarProductos()
        borrarVentas()
    })
    afterEach(() => {
        borrarUsuarios()
        borrarProductos()
        borrarVentas()
    })

    describe('servidor escuchando', () => {
        describe('usuarios', () => {
            describe('intento de agregar uno', () =>{
                describe('si los datos son validos', () =>{
                    it('crea, guarda y devuelve un usuario', async () => {
                        
                        const usuariosAnterior = obtenerUsuarios()

                        const user = {
                            nombre:"Pablo",
                            apellido:"Dominguez",
                            nombreUsuario:"pabloDominguez",
                            dni:"1234567",
                            mail:"pablo@gmail.com",
                            domicilio:"Rivadavia21",
                            fechaNacimiento:"14/03/1999"
                            
                        }

                        const { data: usuarioAgregado, status } = await axios.post(urlUsuarios, user)
                        assert.strictEqual(status, 201)

                        const usuariosDespues = obtenerUsuarios()

                        const usuarioAgregadoEsperado = {...user, id: usuarioAgregado.id}
                        assert.deepStrictEqual(usuariosDespues, usuariosAnterior.concat(usuarioAgregadoEsperado))
                    })
                })

                describe('si no carga el nombre de usuario', () => {
                    it('no agrega nada y devuelve un error', async () => {

                        const usuariosAntes = obtenerUsuarios()

                        const user = {
                            nombre:"Pablo",
                            dni: 12345678,
                            apellido:"Dominguez",
                            nombreUsuario: "",
                            mail:"pablo@gmail.com",
                            domicilio:"Rivadavia21",
                            fechaNacimiento:"14/03/1999"
                        }
                        await assert.rejects(
                            axios.post(urlUsuarios, user),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )

                        const usuariosDespues = obtenerUsuarios()
                        assert.deepStrictEqual(usuariosDespues, usuariosAntes)

                    })
                })

                
            })
            describe('pedir usuarios por id', () => {
                it('devuelve el usuario', async () => {
                    
                    const usuarioAgregado = agregarUsuario(usuario2)

                    let usuarioObtenido
                    const{ data, status } = await axios.get(urlUsuarios + '/' + usuarioAgregado.id)
                    assert.strictEqual(status, 200)
                    usuarioObtenido = data

                    assert.deepStrictEqual(usuarioObtenido, usuarioAgregado)
                })
            })
            
            describe('pedir usuario con id que no existe', () => {
                it('no encuentra el usuario', async () => {
                    await assert.rejects(
                        axios.get(urlUsuarios + '/asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('pedir que borre un usuario por id', () => {
                it('borre el usuario', async () =>{
                    const usuarioAgregado = agregarUsuario(usuario1)
                    const {status} =await axios.delete(urlUsuarios + '/' + usuarioAgregado.id)
                    assert.strictEqual(status, 204)

                    const usuariosDespues = obtenerUsuarios()
                    assert.ok(usuariosDespues.every(u => u.id !== usuarioAgregado.id))
                })
            })

            describe('pedir que borre un usuario que no exista', () =>{
                it('no encuentra el usuario', async () => {
                    await assert.rejects(
                        axios.delete(urlUsuarios + 'asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('mandarle un nuevo usuario y un id', () =>{
                it('reemplaza el existente con el nuevo', async () =>{
                    
                    const usuarioAgregado = agregarUsuario(usuario1)
                    const nuevoNombreUsuario = "dominguezPablo"
                    const datosAct = {...usuarioAgregado, nombreUsuario: nuevoNombreUsuario}

                    const  {status} = await axios.put(urlUsuarios + '/' + usuarioAgregado.id, datosAct)
                    assert.strictEqual(status,200)

                    const usuarioBuscado = obtenerUsuarioSegunId(usuarioAgregado.id)
                    assert.deepStrictEqual(usuarioBuscado, datosAct)
                    

                })
            })

            describe('mandarle un id invalido', () =>{
                it('lanza error',async () => {
                    
                    await assert.rejects(
                        axios.put(urlUsuarios + 'asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                       
                    )
                })
            })
        })

        describe('productos', () => {
            describe('intento agregar un producto valido', () =>{
                    it('lo crea, guarda y devuelve', async () => {
                        
                        const productosAnteriores = obtenerProductos()
                        
                        const producto = {
                            nombre: "Xiaomi",
                            precio: "85000",
                            stock: "25"
                        }
                        const { data: productoAgregado, status } = await axios.post(urlProductos, producto)
                        assert.strictEqual(status, 201)

                        const productosDespues = obtenerProductos()

                        const productoAgregadoEsperado = {...producto, id: productoAgregado.id}
                        assert.deepStrictEqual(productosDespues, productosAnteriores.concat(productoAgregadoEsperado))

                       
                    })
                
 
                describe('si no carga el nombre del producto', () => {
                    it('no agrega nada y devuelve un error', async () => {

                        const productosAnteriores = obtenerProductos()
                        const producto = {
                            nombre: "",
                            precio: 85000,
                            stock: 25
                        }
                        await assert.rejects(
                            axios.post(urlProductos, producto),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )
                        const productosDespues = obtenerProductos()
                        assert.deepStrictEqual(productosDespues, productosAnteriores)

                    })
                })

                
            })
            describe('le pido productos por id', () => {
                it('devuelve el producto', async () => {
                    
                    const productoAgregado = agregarProducto(producto1)
                    let productoObtenido
                    const{ data, status } = await axios.get(urlProductos + '/' + productoAgregado.id)
                    assert.strictEqual(status, 200)
                    productoObtenido = data
                    assert.deepStrictEqual(productoObtenido, productoAgregado)
                })
            })
            

            describe('le pido un producto con un id que no existe', () => {
                it('no lo encuentra', async () => {
                    await assert.rejects(
                        axios.get(urlProductos + '/asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('le pido que borre un producto por id', () => {
                it('borra el producto', async () =>{
                    const productoAgregado = agregarProducto(producto1)
                    const {status} =await axios.delete(urlProductos + '/' + productoAgregado.id)
                    assert.strictEqual(status, 204)
                    const productosDespues = obtenerProductos()
                    assert.ok(productosDespues.every(p => p.id !== productoAgregado.id))
                })
            })

            describe('le pido que borre un producto que no existe', () =>{
                it('no lo encuentra', async () => {
                    await assert.rejects(
                        axios.delete(urlProductos + 'asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe ('me pide que reemplace un producto con un ID invalido', () => {
                it ('no lo encuentra y devuelve error', async () =>{
                    await assert.rejects(
                        axios.put(urlProductos + 'asd'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('le paso un producto ya existente y un  nombre  nuevo', () =>{
                it('cambia el nombre  del producto existente por el nuevo nombre', async () =>{
                    
                    const productoAgregado = agregarProducto(producto1)
                    const datosAct = {...productoAgregado, nombreProducto: "Heladera Samsung Modelo T150"}

                    const  {status} = await axios.put(urlProductos + '/' + productoAgregado.id, datosAct)
                    assert.strictEqual(status,200)
                    
                    const productoBuscado = obtenerProductoSegunId(productoAgregado.id)
                    assert.deepStrictEqual(productoBuscado, datosAct)
                    
                })
            })

        })
        describe('ventas', () => {
            describe('intento de crear una venta', () =>{
                describe('si los datos son validos', () =>{
                    it('crea, guarda y devuelve una venta', async () => {
                        
                        const ventaAnt = obtenerVentas()
                        const venta1 = {
                            fechaCompra:"14/03/1999",
                            precioTotal: 1478,
                            productos:['cafetera', 'licuadora'],
                            usuario: { nombre:"Juan", domicilio:"Rivadavia12",}  
                                                
                        }

                        const { data: ventaCrear, status } = await axios.post(urlVentas, venta1)
                        assert.strictEqual(status, 201)

                        const ventaPost = obtenerUsuarios()

                        const ventaCreadaEsperado = {...venta1, id: ventaCrear.id}
                        assert.deepStrictEqual(ventaPost, ventaAnt.concat(ventaPost))
                    })
                })

               

                
            })

            //Pedir venta por su id
            describe('pedir venta por id', () => {
                it('devuelve una venta', async () => {
                    
                    const ventaAagregar = agregarUsuario(venta2)

                    let ventaObtenido
                    const{ data, status } = await axios.get(urlVentas + '/' + ventaAagregar.id)
                    assert.strictEqual(status, 200)
                    ventaObtenido = data

                    assert.deepStrictEqual(ventaObtenido, ventaAagregar)
                })
            })
            
            //traer una venta con un id que no existe
            describe('pedir venta con id que no existe', () => {
                it('no encuentra la vneta', async () => {
                    await assert.rejects(
                        axios.get(urlVentas + '/idInvalido'),//le mando por barritas un id de una venta, se lo concateno a la url
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            //anular/borrar una venta que exite por id
            describe('pedir que borre una venta por id', () => {
                it('borrar venta', async () =>{
                    const vAgrega = agregarVenta(venta1)
                    const {status} =await axios.delete(urlVentas + '/' + vAgrega.id)
                    assert.strictEqual(status, 204)

                    const ventaDespues = obtenerVentas()
                    assert.ok(ventaDespues.every(u => u.id !== vAgrega.id))
                })
            })
            //anular/borrar una venta que no existe
            describe('pedir que borre una venta que no exista', () =>{
                it('no encuentra la venta', async () => {
                    await assert.rejects(
                        axios.delete(urlVentas + '/idInvalido'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            //que la lista de productos este vacia
            //que el usuario este vacio
            //el precio total sea 0 

            describe('mandarle un id invalido', () =>{
                it('lanza error',async () => {
                    
                    await assert.rejects(
                        axios.put(urlUsuarios + 'idInvalido'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                       
                    )
                })
            })
        })
    
    
    })

})

/*describe('mandarle un dato nuevo invalido', () =>{
    it('lanza error',async () => {
        
        const usuarioAgregado = agregarUsuario(usuario1)
        const nuevoNombre = ''
        const datosAct = {...usuarioAgregado, nombreUsuario: nuevoNombre}

        axios.put(urlUsuarios + '/' + usuarioAgregado.id, datosAct)
            error => {
                assert.strictEqual(error.response.status, 404)
                return true       
            } 

            const usuarioBuscado = obtenerUsuarioSegunId(usuarioAgregado.id)
            assert.deepStrictEqual(usuarioBuscado, datosAct)*/