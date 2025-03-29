import { useEffect, useState } from "react";
import { db } from "./data/db"
import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "../../02_carrito_react_custom_hook/src/hooks/useCart";

function App() {
  useCart()
  console.log("Hola");
  
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

    if(itemExists >= 0) { //existe en el carrito
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
    const updatedCart = cart.map( item => { //itera por cada item del carrito
      if(item.id === id && item.quantity < MAX_ITEMS) {  //si su id es igual al id pasado por el parametro
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
    const updatedCart = cart.map( item => { //itera por cada item del carrito
      if(item.id === id && item.quantity > MIN_ITEMS) {  //si su id es igual al id pasado por el parametro
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





  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}

            />
          ))}

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
