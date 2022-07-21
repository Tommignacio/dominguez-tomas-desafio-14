import FirebaseClass from "../../contenedores/FirebaseClass.js";
import { productsDao as productsBD } from "../index.js";


export class FirebaseCarts extends FirebaseClass {
    constructor() {
        super("carritos");
    }

    //agregar productos al carrito
    async addProducts(cart, products) {
        let cont = 0
        for (let i = 0; i < products.length; i++) {
            //guardo el id de los productos 
            const idProduct = products[i]
            //busco si existem los productos en la BD products
            const buscandoProd = await productsBD.getOne(idProduct)
            if (!buscandoProd) {
                throw new Error("error producto no econtrado")
            } else {
                cart.productos.push(idProduct)
            }
            cont++
        }
        //cuando recorra todos los productos
        if (cont == products.length) {
            //suma la cantidad de productos
            const totalProductosAgregados = products.length
            cart.cantidad += totalProductosAgregados
            //Actualiza el carrito 
            const cartUpdated = await this.update(cart.id, cart)
            console.log(cartUpdated)
            return cartUpdated;
        }
    }
    //elimina productos del carrito por id
    async deleteProduct(cart, idProduct) {
        const productExist = cart.productos.find(el => el == idProduct);
        if (productExist) {
            cart.productos = cart.productos.filter(product =>
                product != idProduct);
        } else {
            throw new Error("El producto no esta en el carrito");
        }
        cart.cantidad = cart.productos.length
        const cartUpdated = await this.update(cart.id, cart)
        return cartUpdated;
    }
}