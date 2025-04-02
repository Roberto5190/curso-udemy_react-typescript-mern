import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db"
import type { Guitar, CartItem } from "../types/types";


export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart') //obtenemos el carrito del localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] //si hay elementos en el carrito loss converitmos a string si no lo dejamos vacio
    }

    // Iniciamos la variable de state data con un array vacio
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // FUNCTIONS

    const addToCart = (item : Guitar)  => {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExists >= 0) { //existe en el carrito
            const updatedCart = [...cart] //creamos una copia del carrito para no mutar el state
            updatedCart[itemExists].quantity++ //actualizamos la cantidad
            setCart(updatedCart) //seteamos updatedCart en el state del carrito

        } else {
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }
    }

    const removeFromCart = (id : Guitar['id']) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) //actualiza el estado del carrito eliminando la guitarra cuyo id coincide con el valor dado, utilizando filter para crear un nuevo array sin ese elemento.
    }

    const incrementQuantity = (id : Guitar['id'] )  => {
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

    const decreaseQuantity = (id : Guitar['id']) => {
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


    // State Derivado
    const isEmptyCart = useMemo(() => cart.length === 0, [cart]) //con useMemo solo renderizamos el carrito cuando se actualiza la dependencia cart    // total del carrito
    // .reduce recorre el array y acumula el valor(total del carrito) que empieza en 0 y va sumando el el resultado de cada iteración
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])//recorre el array cart y suma el la cantidad del producto y el precio, devolviendo el total del carrito.



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        incrementQuantity,
        clearCart,
        isEmptyCart,
        cartTotal
    }
}