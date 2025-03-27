import { useEffect, useState } from "react";
import { db } from "../data/db"

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart') //obtenemos el carrito del localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] //si hay elementos en el carrito loss converitmos a string si no lo dejamos vacio
    }

    // Iniciamos la variable de state data con un array vacio
    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    // cuando se monta el componente actualizamoss data con el contenido de db/ recomendado para APIs
    useEffect(() => {
        setData(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // FUNCTIONS

    const addToCart = (item) => {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExists >= 0) { //existe en el carrito
            const updatedCart = [...cart] //creamos una copia del carrito para no mutar el state
            updatedCart[itemExists].quantity++ //actualizamos la cantidad
            setCart(updatedCart) //seteamos updatedCart en el state del carrito

        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) //actualiza el estado del carrito eliminando la guitarra cuyo id coincide con el valor dado, utilizando filter para crear un nuevo array sin ese elemento.
    }

    const incrementQuantity = (id) => {
        const updatedCart = cart.map(item => { //itera por cada item del carrito
            if (item.id === id && item.quantity < MAX_ITEMS) {  //si su id es igual al id pasado por el parametro
                return {  //devuelve un objeto con una copia del item y su quantity actualizada
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item //el resto de items los mantenemos intactos y los retornamos
        })

        setCart(updatedCart) //actualizamos el estado del carrito con el nuevo array
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => { //itera por cada item del carrito
            if (item.id === id && item.quantity > MIN_ITEMS) {  //si su id es igual al id pasado por el parametro
                return {  //devuelve un objeto con una copia del item y su quantity actualizada
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item //el resto de items los mantenemos intactos y los retornamos
        })

        setCart(updatedCart) //actualizamos el estado del carrito con el nuevo array
    }

    const clearCart = () => {
        setCart([])
    }

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        incrementQuantity,
        clearCart
    }
}